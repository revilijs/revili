import fs from 'node:fs'
import { pathToFileURL } from 'node:url'
import { PATHS } from '../alias.js'

export type ReviliConfig = {
  activeKit: string,
  kitList: string[]
}

export function initConfigFolder() {
  const isExistPackageFile = fs.existsSync(PATHS.DATA_FILES.package)

  if (!isExistPackageFile) {
    //  add package.json into config folder
    setPackageConfig()
  }

  // Always ensure config file is in correct format
  setReviliConfig()
}

export async function getReviliConfig(): Promise<ReviliConfig> {
  const isExistConfigFile = fs.existsSync(PATHS.DATA_FILES.config)
  if (!isExistConfigFile) {
    // create config folder
    fs.mkdirSync(PATHS.USER_DATA_PATH, { recursive: true })
    setReviliConfig()
  }

  try {
    const configContent = fs.readFileSync(PATHS.DATA_FILES.config, 'utf-8')
    return JSON.parse(configContent) as ReviliConfig
  } catch (error) {
    // If file exists but is invalid, reset it
    setReviliConfig()
    return { activeKit: '', kitList: [] }
  }
}

export function setReviliConfig(config: ReviliConfig = {
  activeKit: '',
  kitList: []
}) {
  try {
    // Ensure parent directory exists
    fs.mkdirSync(PATHS.USER_DATA_PATH, { recursive: true })
    fs.writeFileSync(PATHS.DATA_FILES.config, JSON.stringify(config, null, 2))
  } catch (error) {
    console.error('[revili] Failed to write config')
  }
}

export function setPackageConfig() {
  try {
    // Ensure the directory exists
    fs.mkdirSync(PATHS.DATA_DIRS.kits, { recursive: true })

    fs.writeFileSync(PATHS.DATA_FILES.package, JSON.stringify({
      name: 'revili_kits',
      type: 'module'
    }, null, 2))
  } catch (error) {
    console.error('[revili] Failed to write package.json')
  }
}
