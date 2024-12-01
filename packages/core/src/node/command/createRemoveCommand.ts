import {CAC} from 'cac'
import { spinner, chalk } from '@revili/shared/node'

import { PATHS } from '../alias.js'
import { consoleUtil } from '../utils/index.js'
import { execPromise } from '../utils/childProcess.js'
import { getReviliConfig, setReviliConfig, type ReviliConfig } from './handleConfig.js'

export function createRemoveCommand(program: CAC) {
  program
    .command('remove <kit>', 'Remove kit')
    .action(async kit => {
      const reviliConfig: ReviliConfig = await getReviliConfig()

      if (!(reviliConfig.activeKit === kit && reviliConfig.kitList.includes(kit))) {
        consoleUtil.warn(`${kit} has not added`)
        return
      }


      reviliConfig.activeKit = ''
      reviliConfig.kitList.splice(reviliConfig.kitList.findIndex(item => item === kit), 1)

      setReviliConfig(reviliConfig)

      try {
        spinner.start(chalk.blue('[revili] ') + `${kit} is being uninstalled!`)

        const { stdout } = await execPromise(`cd ${PATHS.USER_DATA_PATH} && npm uninstall ${kit} --save`);

        if (!/^\nup to date/.test(stdout) && !/^\nremoved/.test(stdout)) {
          spinner.fail(chalk.red('[revili] ') + `${kit} unloading failed!`)
        } else {
          const reviliConfig: ReviliConfig = await getReviliConfig()

          reviliConfig.activeKit = kit
          reviliConfig.kitList.push(kit)

          setReviliConfig(reviliConfig)

          spinner.succeed(chalk.green('[revili] ') + `${kit} unloaded successfully!`)
        }
      } catch (error) {
        spinner.fail(chalk.red('[revili] ') + `${kit} was not found!`)
      }
    })
}
