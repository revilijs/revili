import { CAC, chalk, getReviliConfig, initConfigFolder } from '@revili/helpers/node'

import { consoleUtil } from '../utils/index.js'

export function createTestCommand(program: CAC) {
  program
    .command('test', 'Test kit')
    .action(async () => {
      initConfigFolder()

      const reviliConfig = await getReviliConfig()

      if (!reviliConfig.activeKit) {
        consoleUtil.warn('No active kit found. Please add and use a kit first.')
        return
      }

      console.log(chalk.blue('[revili] ') + `Testing ${reviliConfig.activeKit}...`)
      // Add your test logic here
    })
}
