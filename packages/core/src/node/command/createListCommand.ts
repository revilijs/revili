import {CAC} from 'cac'
import { chalk } from '@revili/shared/node'

import { ReviliConfig, getReviliConfig } from './handleConfig.js'
import { consoleUtil } from '../utils/index.js'

export function createListCommand(program: CAC) {
  program
    .command('ls', 'Check the added kits')
    .action(async () => {
      await listHandler()
    })

  program
    .command('list', 'Check the added kits')
    .action(async () => {
      await listHandler()
    })
}

async function listHandler() {
  const reviliConfig: ReviliConfig = await getReviliConfig()

  if (!reviliConfig.kitList.length) {
    consoleUtil.warn('No kits have been added yet.')
  } else {
    console.log(chalk.blue('[revili] ') + 'List of installed kits:')
    reviliConfig.kitList.forEach(kit => {
      if (kit === reviliConfig.activeKit) {
        console.log(chalk.green('* ') + kit)
      } else {
        console.log('  ' + kit)
      }
    })
  }
}
