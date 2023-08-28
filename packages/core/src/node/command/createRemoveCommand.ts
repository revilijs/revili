import {CAC} from 'cac'

import { getReviliCache, setReviliCache, type ReviliCache } from './handleCache.js'

export function createRemoveCommand(program: CAC) {
  program
    .command('remove <kit>', 'Remove kit')
    .action(async kit => {
      const reviliCache: ReviliCache = await getReviliCache()

      if (!reviliCache.kitList.includes(kit)) {
        console.error(`[revili] ${kit} has not added`)
      } else {
        reviliCache.kitList.splice(reviliCache.kitList.findIndex(item => item === kit), 1)
        if (reviliCache.activeKit === kit) {
          reviliCache.activeKit = ''
        }

        setReviliCache(reviliCache)
      }
    })
}
