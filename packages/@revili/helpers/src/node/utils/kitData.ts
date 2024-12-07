import fs from 'node:fs'
import { resolve } from 'node:path'
import { DATA_DIRS } from '../paths.js'

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
 * @param kitName The name of the kit (e.g., "@revili/kit-demo")
 * @returns The directory name (e.g., "@revili/kit-demo")
 */
function kitNameToPath(kitName: string): string {
  // We keep the @ and / as is since they're valid in directory names
  // Just ensure there are no other invalid characters
  return kitName.replace(/[<>:"|?*]/g, '')
}

/**
 * Get the data directory path for a specific kit
 * @param kitName The name of the kit
 * @returns The absolute path to the kit's data directory
 */
function getKitDataPath(kitName: string) {
  const kitPath = kitNameToPath(kitName)
  return resolve(DATA_DIRS.kitsData, kitPath)
}

/**
 * Get a file path within a kit's data directory
 * @param kitName The name of the kit
 * @param filename The name of the file
 * @returns The absolute path to the file in the kit's data directory
 */
function getKitDataFilePath(kitName: string, filename: string) {
  return resolve(getKitDataPath(kitName), filename)
}

/**
 * Ensure kit data directory exists
 * @param kitName The name of the kit
 */
function ensureKitDataDir(kitName: string) {
  const kitDataDir = getKitDataPath(kitName)
  if (!fs.existsSync(kitDataDir)) {
    fs.mkdirSync(kitDataDir, { recursive: true })
  }
}

/**
 * Remove kit data directory and all its contents
 * @param kitName The name of the kit
 */
export async function removeKitData(kitName: string): Promise<void> {
  const kitDataDir = getKitDataPath(kitName)
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
 * @param kitName The name of the kit
 * @returns The kit data object, or empty object if data doesn't exist
 */
export async function getKitData<T extends object>(kitName: string): Promise<T> {
  const dataPath = getKitDataFilePath(kitName, 'data.json')

  try {
    const content = await fs.promises.readFile(dataPath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    // Return empty object if file doesn't exist or is invalid
    return {} as T
  }
}

/**
 * Write kit data to data.json
 * @param kitName The name of the kit
 * @param data The data object to write
 */
export async function writeKitData<T extends object>(kitName: string, data: T): Promise<void> {
  ensureKitDataDir(kitName)
  const dataPath = getKitDataFilePath(kitName, 'data.json')
  await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2))
}

/**
 * Update part of kit data
 * @param kitName The name of the kit
 * @param partialData Partial data object to merge with existing data
 */
export async function updateKitData<T extends object>(kitName: string, partialData: Partial<T>): Promise<void> {
  const currentData = await getKitData<T>(kitName)
  const updatedData = { ...currentData, ...partialData }
  await writeKitData(kitName, updatedData)
}
