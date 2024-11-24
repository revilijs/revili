import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { CACHE_FOLDER_PATH, CWD } from '../alias.js'
import { getReviliCache } from '../command/handleCache.js'

import type { Kit } from '@revili/shared/node'

export async function getActiveKit(customKitDir: string) {
  try {
    const { activeKit: activeKitName } = await getReviliCache();

    const ACTIVE_KIT_DIR = path.join(CACHE_FOLDER_PATH, `./node_modules/${activeKitName}`);

    const CLIENT_DIR = customKitDir
      ? path.join(CWD, `${customKitDir}/client`)
      : path.join(ACTIVE_KIT_DIR, `./dist/client`);

    const ACTIVE_KIT_ENTRY = customKitDir
      ? path.join(CWD, `${customKitDir}/node/index.js`)
      : path.join(ACTIVE_KIT_DIR, `./dist/node/index.js`);

    const activeKit = (await import(pathToFileURL(ACTIVE_KIT_ENTRY) as unknown as string)).default as Kit;

    return { activeKit, CLIENT_DIR }
  } catch(error) {
    return { activeKit: null, CLIENT_DIR: '' }
  }
}
