import os from 'node:os'
import process from 'node:process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Environment variable for data directory
const USER_DATA_DIR_ENV = 'REVILI_DATA_DIR'

// Get the current working directory
export const CWD = process.cwd()

// Get the root directory of the package
export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')

// Path to the client distribution directory
export const DIST_CLIENT_PATH = resolve(PKG_ROOT, 'client')

// Directory containing CLI-related files
export const CLI_FILE_DIR = resolve(fileURLToPath(import.meta.url), '..')

// Base user data directory structure
const homeDir = os.homedir()
const defaultDataDir = resolve(homeDir, '.revili')

// Allow custom data directory through environment variable
// This is useful for:
// 1. Different user profiles or workspaces
// 2. Custom deployment environments
// 3. Systems with specific data storage requirements
export const USER_DATA_PATH = process.env[USER_DATA_DIR_ENV]
  ? resolve(process.env[USER_DATA_DIR_ENV])
  : defaultDataDir

// Organized data subdirectories
export const DATA_DIRS = {
  // Directory for storing revili kits
  kits: resolve(USER_DATA_PATH, 'kits')
} as const

// Specific data file paths
export const DATA_FILES = {
  package: resolve(DATA_DIRS.kits, 'package.json'),
  config: resolve(USER_DATA_PATH, 'revili.config.json')
} as const

// Export all path constants
export const PATHS = {
  CWD,
  PKG_ROOT,
  DIST_CLIENT_PATH,
  CLI_FILE_DIR,
  USER_DATA_PATH,
  DATA_DIRS,
  DATA_FILES
} as const
