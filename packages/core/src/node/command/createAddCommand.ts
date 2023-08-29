import {CAC} from 'cac'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import { initCacheFolder, getReviliCache, setReviliCache, type ReviliCache } from './handleCache.js'
import { CACHE_FOLDER_PATH } from '../alias.js'

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
      const execPromise = promisify(exec);

      try {
        const { stdout } = await execPromise(`cd ${CACHE_FOLDER_PATH} && npm install ${targetKit} --save`);

        if (!/^\nup to date/.test(stdout) && !/^\nadded/.test(stdout)) {
          console.error(`[revili] ${kit} add fail`);
        } else {
          const reviliCache: ReviliCache = await getReviliCache()

          reviliCache.activeKit = kit
          reviliCache.kitList.push(kit)

          setReviliCache(reviliCache)
        }
      } catch (error) {
        console.error(`[revili] ${kit} not found`)
      }
    })
}
