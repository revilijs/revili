import {CAC} from 'cac'
import { spinner, chalk } from '@revili/shared/node'

import { CACHE_FOLDER_PATH } from '../alias.js'
import { consoleUtil } from '../utils/index.js'
import { execPromise } from '../utils/childProcess.js'
import { getReviliCache, setReviliCache, type ReviliCache } from './handleCache.js'

export function createRemoveCommand(program: CAC) {
  program
    .command('remove <kit>', 'Remove kit')
    .action(async kit => {
      const reviliCache: ReviliCache = await getReviliCache()

      if (!(reviliCache.activeKit === kit && reviliCache.kitList.includes(kit))) {
        consoleUtil.warn(`${kit} has not added`)
        return
      }


      reviliCache.activeKit = ''
      reviliCache.kitList.splice(reviliCache.kitList.findIndex(item => item === kit), 1)

      setReviliCache(reviliCache)

      try {
        spinner.start(chalk.blue('[revili] ') + `${kit} is being uninstalled!`)

        const { stdout } = await execPromise(`cd ${CACHE_FOLDER_PATH} && npm uninstall ${kit} --save`);

        if (!/^\nup to date/.test(stdout) && !/^\nremoved/.test(stdout)) {
          spinner.fail(chalk.red('[revili] ') + `${kit} unloading failed!`)
        } else {
          const reviliCache: ReviliCache = await getReviliCache()

          reviliCache.activeKit = kit
          reviliCache.kitList.push(kit)

          setReviliCache(reviliCache)

          spinner.succeed(chalk.green('[revili] ') + `${kit} unloaded successfully!`)
        }
      } catch (error) {
        spinner.fail(chalk.red('[revili] ') + `${kit} was not found!`)
      }
    })
}
