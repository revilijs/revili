import {CAC} from 'cac'

import { ReviliCache, getReviliCache, initCacheFolder } from './handleCache.js'
import { consoleUtil } from '../utils/index.js'

export function createTestCommand(program: CAC) {
  program
    .command('test', 'Check the added kits')
    .action(async ({ dev = false }) => {
      initCacheFolder()
    })
}
