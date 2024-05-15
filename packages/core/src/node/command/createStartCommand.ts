import {CAC} from 'cac'
import {createViteServer} from '../viteServer/index.js'

export function createStartCommand(program: CAC) {
  program
    .command('start', 'Starting the service')
    .option('--dev', 'Open develop mode')
    .option('--dir <dir>', 'Specify the entry file path for kit')
    .action(async ({ dev: devMode = false, dir: customKitDir }) => {
      await createViteServer({ devMode, customKitDir })
    })
}
