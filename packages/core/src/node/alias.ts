import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import {
  CWD,
  DATA_DIRS,
  DATA_FILES,
  USER_DATA_PATH
} from '@revili/helpers/node'

// Get the root directory of the package
const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')

// Path to the client distribution directory
const DIST_CLIENT_PATH = resolve(PKG_ROOT, 'client')

// Directory containing CLI-related files
const CLI_FILE_DIR = resolve(fileURLToPath(import.meta.url), '..')

// Export all path constants
export const PATHS = {
  CWD,
  PKG_ROOT,
  DATA_DIRS,
  DATA_FILES,
  CLI_FILE_DIR,
  USER_DATA_PATH,
  DIST_CLIENT_PATH,
} as const
