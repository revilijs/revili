import {CAC} from 'cac'
import {createViteServer} from '../viteServer/index.js'

export function createDevCommand(program: CAC) {
  program
    .command('dev', 'Starting the service')
    .action(async () => {
      await createViteServer()
    })
}
