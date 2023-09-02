import {CAC} from 'cac'
import {createViteServer} from '../viteServer/index.js'

export function createStartCommand(program: CAC) {
  program
    .command('start', 'Starting the service')
    .option('--dev', 'Open develop mode')
    .action(async ({ dev = false }) => {
      await createViteServer(dev)
    })
}
