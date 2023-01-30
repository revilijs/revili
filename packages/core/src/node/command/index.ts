import {CAC} from 'cac'

const program = new CAC('vicli')

export function createCommand(callback: (program: CAC) => void) {
  program.option('--type [type]', 'Choose a project type', {default: 'node'})

  program.command('lint [...fiels]', 'lint fiels').action((files, options) => {})

  program
    .command('rm <dir>', 'Remove a dir')
    .option('-r, --recursive', 'Remove recursively')
    .action((dir, options) => {
      console.log('remove' + dir, options.recursive ? 'recursively' : '')
    })

  callback(program)

  program.help()

  program.parse()
}
