import {CAC} from 'cac'

import { ReviliConfig, getReviliConfig, initConfigFolder } from './handleConfig.js'
import { consoleUtil } from '../utils/index.js'

export function createTestCommand(program: CAC) {
  program
    .command('test', 'Test command')
    .action(async () => {
      initConfigFolder()

      const reviliConfig: ReviliConfig = await getReviliConfig()

      consoleUtil.log(JSON.stringify(reviliConfig, null, 2))
    })
}
