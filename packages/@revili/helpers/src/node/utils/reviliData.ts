import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { CWD, DATA_FILES, DATA_DIRS, USER_DATA_PATH } from '../paths.js'

import { Kit } from './defineKit.js'

export interface ReviliConfig {
  activeKit: string
  kitList: string[]
}

export async function initConfigFolder() {
  if (!fs.existsSync(DATA_DIRS.kits)) {
    fs.mkdirSync(DATA_DIRS.kits, { recursive: true })
  }

  if (!fs.existsSync(DATA_FILES.package)) {
    //  add package.json into config folder
    setPackageConfig()
  }
}

export async function getReviliConfig(): Promise<ReviliConfig> {
  const isExistConfigFile = fs.existsSync(DATA_FILES.config)
  if (!isExistConfigFile) {
    // create config folder
    fs.mkdirSync(USER_DATA_PATH, { recursive: true })
    setReviliConfig()
  }

  try {
    const content = await fs.promises.readFile(DATA_FILES.config, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    // Return default config if file doesn't exist or is invalid
    return {
      activeKit: '',
      kitList: []
    }
  }
}

export async function setReviliConfig(config: ReviliConfig = {
  activeKit: '',
  kitList: []
}): Promise<void> {
  try {
    // Ensure parent directory exists
    fs.mkdirSync(USER_DATA_PATH, { recursive: true })
    fs.writeFileSync(DATA_FILES.config, JSON.stringify(config, null, 2))
  } catch (error) {
    console.error('[revili] Failed to write config')
  }
}

export function setPackageConfig() {
  try {
    // Ensure the directory exists
    fs.mkdirSync(DATA_DIRS.kits, { recursive: true })
    fs.writeFileSync(DATA_FILES.package, JSON.stringify({
      name: 'revili_kits',
      type: 'module'
    }, null, 2))
  } catch (error) {
    console.error('[revili] Failed to write package.json')
  }
}

export async function getActiveKit(customKitDir: string) {
  try {
    const { activeKit: activeKitName } = await getReviliConfig();

    const ACTIVE_KIT_DIR = path.join(DATA_DIRS.kits, `./node_modules/${activeKitName}`);

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
