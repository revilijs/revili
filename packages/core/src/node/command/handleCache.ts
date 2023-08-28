import fs from 'node:fs'
import { CACHE_FOLDER_PATH, CACHE_PACKAGED_FILE_PATH, CACHE_CONFIG_FILE_PATH } from '../alias.js'

export type ReviliCache = {
  activeKit: string,
  kitList: string[]
}

export function initCacheFolder() {
  const isExistPackageFile = fs.existsSync(CACHE_PACKAGED_FILE_PATH)

  if (!isExistPackageFile) {
    //  add CACHE_PACKAGED_FILE(package.json) into .cache
    setPackageCache()

    //  add CACHE_PCONFIG_FILE(revili.config.js) into .cache
    setReviliCache()
  }
}

export async function getReviliCache(): Promise<ReviliCache> {
  const isExistCacheFile = fs.existsSync(CACHE_CONFIG_FILE_PATH)
  if (!isExistCacheFile) {
    // create cache folder '.cache'
    fs.mkdirSync(CACHE_FOLDER_PATH)
    setReviliCache()
  }

  const reviliCache = await import(CACHE_CONFIG_FILE_PATH)
  return reviliCache.default
}

export function setReviliCache(cache: ReviliCache = {
  activeKit: '',
  kitList: []
}) {
  try {
    fs.writeFileSync(CACHE_CONFIG_FILE_PATH, `export default ${JSON.stringify(cache)}`)
  } catch (error) {
    console.error('[revili] handle revili.cache.js cache fail')
  }
}

export function setPackageCache() {
  try {
    fs.writeFileSync(CACHE_PACKAGED_FILE_PATH, JSON.stringify({
      name: 'revili_caches',
      type: 'module'
    })
    )
  } catch (error) {
    console.error('[revili] handle package.json cache fail')
  }
}
