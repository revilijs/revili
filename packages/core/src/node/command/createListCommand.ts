import {CAC} from 'cac'
import { chalk } from '@revili/shared/node'

import { ReviliCache, getReviliCache } from './handleCache.js'
import { consoleUtil } from '../utils/index.js'

export function createListCommand(program: CAC) {
  program
    .command('ls', 'Check the added kits')
    .action(async ({ dev = false }) => {
      await listHandler()
    })

  program
    .command('list', 'Check the added kits')
    .action(async ({ dev = false }) => {
      await listHandler()
    })
}

async function listHandler() {
  const { kitList, activeKit }: ReviliCache = await getReviliCache()

  const kitListStr = kitList.reduce((total, next) => {
    return total + (next === activeKit ? `${chalk.green(`* ${next}`)}\n` : `- ${next}\n`)
  }, '')

  consoleUtil.log(
`The list of added kit is as follows:

${kitListStr}
`
  )
}
