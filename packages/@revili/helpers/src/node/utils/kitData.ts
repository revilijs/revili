import fs from 'node:fs'
import { resolve } from 'node:path'
import { DATA_DIRS } from '../paths.js'
import { getReviliConfig } from './reviliData.js'
import { get } from 'node:http'

/**
 * Basic object type with any string/number/symbol keys
 */
export type BasicRecord = Record<string | number | symbol, unknown>

/**
 * Basic kit data structure
 */
export interface KitData<T extends BasicRecord & Omit<KitData<T>, 'name' | 'installedAt'> = {}> {
  name: string
  installedAt: string
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
export async function getKitData<K extends keyof KitData = keyof KitData>(
  prop: K
): Promise<KitData[K] | null>
export async function getKitData<T extends BasicRecord, K extends keyof T = keyof T>(
  prop: K
): Promise<T[K] | null>
export async function getKitData<T extends BasicRecord>(): Promise<KitData<T> | null>
export async function getKitData(): Promise<KitData<{}> | null>
export async function getKitData<T extends BasicRecord, K extends keyof KitData<T>>(
  prop?: K
): Promise<KitData<T>[K] | null | KitData<T>> {
  const { activeKit } = await getReviliConfig()
  const dataPath = await getKitDataFilePath(activeKit, 'data.json')

  try {
    const content = await fs.promises.readFile(dataPath, 'utf-8')
    const data = JSON.parse(content) as KitData<T>

    if (prop !== undefined) {
      return data[prop] !== undefined ? data[prop] : null
    }

    return data
  } catch (error) {
    console.error('Error reading kit data:', error)
    return null
  }
}

/**
 * Write kit data to data.json
 * @param kitName The name of the kit
 * @param data The data object to write
 */
export async function writeKitData<T extends BasicRecord & Omit<KitData<T>, 'name' | 'installedAt'>>(kitName: string, data: KitData<T>): Promise<void> {
  await ensureKitDataDir(kitName)
  const dataPath = await getKitDataFilePath(kitName, 'data.json')
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2))
}

/**
 * Update part of kit data
 * @param partialData Partial data object to merge with existing data
 */
export async function updateKitData<T extends BasicRecord & Omit<KitData<T>, 'name' | 'installedAt'>>(partialData: Partial<KitData<T>>): Promise<void> {
  const { activeKit } = await getReviliConfig()
  const existingData = (await getKitData<T>() ?? {}) as KitData<T>

  const newData: KitData<T> = {
    ...existingData,
    ...partialData,
    name: activeKit,
    installedAt: existingData?.installedAt ?? new Date().toISOString()
  }

  await writeKitData(activeKit, newData)
}

/**
 * Update a single item in kit data
 * @param key The key to update (cannot be 'name' or 'installedAt')
 * @param value The new value
 */
export async function updateKitDataItem<
  T extends BasicRecord,
  K extends Exclude<keyof T, 'name' | 'installedAt'>
>(key: K, value: T[K]): Promise<void> {
  const { activeKit } = await getReviliConfig()
  const existingData = (await getKitData<T>() ?? {}) as KitData<T>

  const newData: KitData<T> = {
    ...existingData,
    [key]: value
  }

  await writeKitData(activeKit, newData)
}
