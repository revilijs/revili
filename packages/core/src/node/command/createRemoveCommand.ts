import { CAC, spinner, chalk, execPromise, removeKitData, getReviliConfig, setReviliConfig, type ReviliConfig } from '@revili/helpers/node'

import { PATHS } from '../alias.js'
import { consoleUtil } from '../utils/index.js'

export function createRemoveCommand(program: CAC) {
  program
    .command('remove <kit>', 'Remove kit')
    .action(async kit => {
      const reviliConfig: ReviliConfig = await getReviliConfig()

      if (!reviliConfig.kitList.includes(kit)) {
        consoleUtil.warn(`${kit} has not been added!`)
      } else {
        // Remove from config
        reviliConfig.kitList = reviliConfig.kitList.filter(k => k !== kit)
        if (reviliConfig.activeKit === kit) {
          reviliConfig.activeKit = reviliConfig.kitList[0] || ''
        }
        await setReviliConfig(reviliConfig)

        // Remove kit data
        await removeKitData(kit)

        try {
          spinner.start(chalk.blue('[revili] ') + `${kit} is being uninstalled!`)

          const { stdout } = await execPromise(`cd ${PATHS.USER_DATA_PATH} && npm uninstall ${kit} --save`);

          if (!/^\nup to date/.test(stdout) && !/^\nremoved/.test(stdout)) {
            spinner.fail(chalk.red('[revili] ') + `${kit} unloading failed!`)
          } else {
            spinner.succeed(chalk.green('[revili] ') + `${kit} unloaded successfully!`)
          }
        } catch (error) {
          spinner.fail(chalk.red('[revili] ') + `${kit} was not found!`)
        }

        consoleUtil.success(`Remove ${kit} succeeded!`)
      }
    })
}
