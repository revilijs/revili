import fs from 'node:fs'
import { resolve } from 'node:path'
import { DATA_DIRS } from '../paths.js'
import { getReviliConfig } from './reviliData.js'

/**
 * Basic kit data structure
 */
export interface KitData {
  name: string
  installedAt: string
  [key: string]: unknown
}

/**
 * Convert kit name to a valid directory path
 * Handles scoped packages like @org/name
 * @param kitName The name of the kit
 * @returns The directory name (e.g., "@revili/kit-demo")
 */
async function kitNameToPath(kitName: string): Promise<string> {
  // We keep the @ and / as is since they're valid in directory names
  // Just ensure there are no other invalid characters
  return kitName.replace(/[<>:"|?*]/g, '') ?? ''
}

/**
 * Get the data directory path for a specific kit
 * @param kitName The name of the kit
 * @returns The absolute path to the kit's data directory
 */
async function getKitDataPath(kitName: string) {
  const kitPath = await kitNameToPath(kitName)
  return resolve(DATA_DIRS.kitsData, kitPath)
}

/**
 * Get a file path within a kit's data directory
 * @param kitName The name of the kit
 * @param filename The name of the file
 * @returns The absolute path to the file in the kit's data directory
 */
async function getKitDataFilePath(kitName: string, filename: string) {
  return resolve(await getKitDataPath(kitName), filename)
}

/**
 * Ensure kit data directory exists
 * @param kitName The name of the kit
 */
async function ensureKitDataDir(kitName: string) {
  const dir = await getKitDataPath(kitName)
  await fs.promises.mkdir(dir, { recursive: true })
}

/**
 * Remove kit data directory and all its contents
 * @param kitName The name of the kit
 */
export async function removeKitData(kitName: string): Promise<void> {
  const kitDataDir = resolve(DATA_DIRS.kits, await kitNameToPath(kitName))
  if (fs.existsSync(kitDataDir)) {
    await fs.promises.rm(kitDataDir, { recursive: true, force: true })
  }
}

/**
 * Initialize kit data with default values
 * @param kitName The name of the kit
 */
export async function initKitData(kitName: string): Promise<void> {
  const defaultData: KitData = {
    name: kitName,
    installedAt: new Date().toISOString()
  }
  await writeKitData(kitName, defaultData)
}

/**
 * Read kit data from data.json
 * @returns The kit data object, or null if data doesn't exist
 */
export async function getKitData<T extends Omit<KitData, 'name' | 'installedAt'>, K extends keyof T = never>(
  prop?: K
): Promise<K extends never ? (KitData & T) | null : T[K] | null> {
  const { activeKit } = await getReviliConfig()
  const dataPath = await getKitDataFilePath(activeKit, 'data.json')

  try {
    const content = await fs.promises.readFile(dataPath, 'utf-8')
    const data = JSON.parse(content) as KitData & T

    if (prop !== undefined) {
      return data[prop] as K extends never ? (KitData & T) | null : T[K] | null
    }

    return data as K extends never ? (KitData & T) | null : T[K] | null
  } catch (error) {
    console.error('Error reading kit data:', error)
    return null as K extends never ? (KitData & T) | null : T[K] | null
  }
}

/**
 * Write kit data to data.json
 * @param kitName The name of the kit
 * @param data The data object to write
 */
export async function writeKitData(kitName: string, data: KitData): Promise<void> {
  await ensureKitDataDir(kitName)
  const dataPath = await getKitDataFilePath(kitName, 'data.json')
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2))
}

/**
 * Update part of kit data
 * @param partialData Partial data object to merge with existing data
 */
export async function updateKitData<T extends KitData>(partialData: Partial<T>): Promise<void> {
  const { activeKit } = await getReviliConfig()
  const existingData = (await getKitData<T>() ?? {}) as (KitData & T)

  const newData: T = {
    ...existingData,
    ...partialData,
    name: activeKit,
    installedAt: existingData?.installedAt ?? new Date().toISOString()
  } as T

  await writeKitData(activeKit, newData)
}
