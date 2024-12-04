import { CAC } from 'cac'
import { chalk } from '@revili/shared/node'

import { consoleUtil } from '../utils/index.js'
import { getReviliConfig } from '../utils/reviliData.js'

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
  const reviliConfig = await getReviliConfig()

  if (!reviliConfig.kitList.length) {
    consoleUtil.warn('No kits have been added yet!')
    return
  }

  console.log(chalk.blue('[revili] ') + 'Installed kits:')
  reviliConfig.kitList.forEach(kit => {
    const prefix = kit === reviliConfig.activeKit ? '* ' : '  '
    console.log(prefix + kit)
  })
}
