import {CAC} from 'cac'
import { spinner, chalk } from '@revili/shared/node'

import { CACHE_FOLDER_PATH } from '../alias.js'
import { execPromise } from '../utils/childProcess.js'
import { initCacheFolder, getReviliCache, setReviliCache, type ReviliCache } from './handleCache.js'

const kitRegExp = /^(@[\d_-\w\W]+\/)?([\d_-\w]+)(@.+)?$/

export function createAddCommand(program: CAC) {
  program
    .command('add <kit>', 'Install kit')
    .action(async targetKit => {
      initCacheFolder()

      if (!kitRegExp.test(targetKit)) {
        console.error(`[revili] ${targetKit} not found`)
        return
      }

      const [, scope = '', name] = targetKit.match(kitRegExp)

      const kit = `${scope}${name}`


      // 子命令执行安装 npm 包的操作
      try {
        spinner.start(chalk.blue('[revili] ') + `${targetKit} is loading!`)

        const { stdout } = await execPromise(`cd ${CACHE_FOLDER_PATH} && npm install ${targetKit} --save`);

        if (!/^\nup to date/.test(stdout) && !/^\nadded/.test(stdout)) {
          spinner.fail(chalk.red('[revili] ') + `${targetKit} failed to load!`)
        } else {
          const reviliCache: ReviliCache = await getReviliCache()

          reviliCache.activeKit = kit
          reviliCache.kitList.push(kit)

          setReviliCache(reviliCache)

          spinner.succeed(chalk.green('[revili] ') + `${targetKit} loaded successfully!`)
        }
      } catch (error) {
        spinner.fail(chalk.red('[revili] ') + `${targetKit} was not found!`)
      }

      spinner.stop();
    })
}
