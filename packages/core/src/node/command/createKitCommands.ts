import {CAC} from 'cac'
import path from 'node:path'

import { CACHE_FOLDER_PATH } from '../alias.js'
import { getReviliCache } from './handleCache.js'

export async function createKitCommands(program: CAC) {
  const { activeKit } = await getReviliCache()

  const kitPath = path.join(CACHE_FOLDER_PATH, `./node_modules/${activeKit}/dist/node/index.js`)
  const kit = (await import(kitPath)).default

  kit.registerCommand({ program })
}
