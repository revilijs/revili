import fs from 'node:fs'
import { resolve } from 'node:path'
import { DATA_FILES } from '../alias.js'

export interface ReviliConfig {
  activeKit: string
  kitList: string[]
}

export async function initConfigFolder() {
  const configDir = resolve(DATA_FILES.config, '..')
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }
}

export async function getReviliConfig(): Promise<ReviliConfig> {
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

export async function setReviliConfig(config: ReviliConfig): Promise<void> {
  await initConfigFolder()
  await fs.promises.writeFile(DATA_FILES.config, JSON.stringify(config, null, 2))
}
