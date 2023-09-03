import {CAC} from 'cac'

import { consoleUtil } from '../utils/index.js'
import { getReviliCache, setReviliCache, type ReviliCache } from './handleCache.js'

export function createUseCommand(program: CAC) {
  program
    .command('use <kit>', 'Use kit')
    .action(async kit => {
      const reviliCache: ReviliCache = await getReviliCache()

      if (reviliCache.activeKit === kit) {
        consoleUtil.warn(`${kit} is active and does not need to be switched.`)
      } else if (!reviliCache.kitList.includes(kit)) {
        consoleUtil.warn(`${kit} has not been added, please execute 'revili add ${kit}' first.`)
      } else {
        reviliCache.activeKit = kit
        setReviliCache(reviliCache)

        consoleUtil.success(`Switching ${kit} succeeded!`)
      }
    })
}
