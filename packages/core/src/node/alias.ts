import {resolve, join} from 'node:path'
import {fileURLToPath} from 'node:url'

export const USER_PROJECT_ROOT = resolve('.')
export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')
export const PKG_ROOT_NODE_MODULES = resolve(PKG_ROOT, '../../..')
export const PKG_ROOT_NODE_MODULES_DEVELOPMENT = resolve(PKG_ROOT, '../../../node_modules')

export const DIST_CLIENT_PATH = resolve(PKG_ROOT, 'client')
export const APP_PATH = join(DIST_CLIENT_PATH, 'app')
