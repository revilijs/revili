import process from 'node:process'
import {resolve, join} from 'node:path'
import {fileURLToPath} from 'node:url'

export const CWD = process.cwd() // OR resolve('.')
export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')

export const DIST_CLIENT_PATH = resolve(PKG_ROOT, 'client')

export const CLI_FILE_DIR = resolve(fileURLToPath(import.meta.url), '..')
export const CACHE_FOLDER_PATH = join(CLI_FILE_DIR, './.caches')
export const CACHE_PACKAGED_FILE_PATH = join(CACHE_FOLDER_PATH, './package.json')
export const CACHE_CONFIG_FILE_PATH = join(CACHE_FOLDER_PATH, './revili.cache.js')
