import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

import { PATHS } from '../alias.js'
import { getReviliConfig } from './reviliData.js'

import type { Kit } from '@revili/helpers/node'

export async function getActiveKit(customKitDir: string) {
  try {
    const config = await getReviliConfig()
    const activeKit = config.activeKit

    if (!activeKit) {
      return { activeKit: null, CLIENT_DIR: '' }
    }

    const kitPath = resolve(PATHS.DATA_DIRS.kits, 'node_modules', activeKit)

    if (!existsSync(kitPath)) {
      return { activeKit: null, CLIENT_DIR: '' }
    }

    const CLIENT_DIR = customKitDir
      ? resolve(PATHS.CWD, `${customKitDir}/client`)
      : resolve(kitPath, `./dist/client`)

    const ACTIVE_KIT_ENTRY = customKitDir
      ? resolve(PATHS.CWD, `${customKitDir}/node/index.js`)
      : resolve(kitPath, `./dist/node/index.js`)

    const activeKitModule = (await import(pathToFileURL(ACTIVE_KIT_ENTRY).href)) as { default: Kit }
    return { activeKit: activeKitModule.default, CLIENT_DIR }
  } catch (error) {
    return { activeKit: null, CLIENT_DIR: '' }
  }
}
