import os from 'node:os'
import process from 'node:process'
import { resolve } from 'node:path'

// Environment variable for data directory
const USER_DATA_DIR_ENV = 'REVILI_DATA_DIR'

// Get the current working directory
export const CWD = process.cwd()

// Base user data directory structure
const homeDir = os.homedir()
const defaultDataDir = resolve(homeDir, '.revili')

// Allow custom data directory through environment variable
export const USER_DATA_PATH = process.env[USER_DATA_DIR_ENV]
  ? resolve(process.env[USER_DATA_DIR_ENV])
  : defaultDataDir

// Organized data subdirectories
export const DATA_DIRS = {
  // Directory for storing revili kits
  kits: resolve(USER_DATA_PATH, 'kits'),
  // Directory for storing kit-specific data
  kitsData: resolve(USER_DATA_PATH, 'kitsData')
} as const

// Specific data file paths
export const DATA_FILES = {
  package: resolve(DATA_DIRS.kits, 'package.json'),
  config: resolve(USER_DATA_PATH, 'revili.config.json')
} as const
