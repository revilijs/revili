import {CAC} from 'cac'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { CACHE_FOLDER_PATH } from '../alias.js'
import { getActiveKit } from '../utils/getActiveKit.js'

export async function createKitCommands(program: CAC, customKitDir: string) {
  const { activeKit } = await getActiveKit(customKitDir)

  if (activeKit) {
    activeKit.registerCommand({ program })
  }
}
