import {CAC} from 'cac'

import { getReviliCache, setReviliCache, type ReviliCache } from './handleCache.js'

export function createUseCommand(program: CAC) {
  program
    .command('use <kit>', 'Use kit')
    .action(async kit => {
      const reviliCache: ReviliCache = await getReviliCache()

      if (!reviliCache.kitList.includes(kit)) {
        console.error(`[revili] ${kit} has not added, please apply revili add ${kit}`)
      } else {
        reviliCache.activeKit = kit
        setReviliCache(reviliCache)
      }
    })
}
