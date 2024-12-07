
import fs from 'node:fs'
import { join } from 'node:path'
import { CAC } from '@revili/helpers/node'

import { PATHS } from '../alias.js'

const program = new CAC('revili')

export async function initCommand(callback: (program: CAC) => void) {
  program.option('--type [type]', 'Choose a project type', {default: 'node'})

  program.command('lint [...fiels]', 'lint fiels').action((files, options) => {})

  program
    .command('rm <dir>', 'Remove a dir')
    .option('-r, --recursive', 'Remove recursively')
    .action((dir, options) => {
      console.log('remove' + dir, options.recursive ? 'recursively' : '')
    })

  await callback(program)

  const version = getVerson()
  program.version(version)

  program.help()

  program.parse()
}

function getVerson(): string {
  let version = 'null'
  const PACKAGE_PATH = join(PATHS.CLI_FILE_DIR, '../../package.json')

  try {
    version = JSON.parse(fs.readFileSync(PACKAGE_PATH).toString()).version
  } catch (error) {}

  return version
}
