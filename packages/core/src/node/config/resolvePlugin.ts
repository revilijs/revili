import fs from 'node:fs'
import path from 'node:path'
import {APP_PATH} from '../alias.js'

import type {DefinePluginReturn} from 'vicli-shared/node'

export async function resolvePlugin(pluginPkg: DefinePluginReturn): Promise<DefinePluginReturn> {
  const pluginOptions = pluginPkg

  cachePageComponent(pluginOptions)

  return pluginOptions
}

function cachePageComponent(pluginOptions: DefinePluginReturn) {
  const {name, layouts} = pluginOptions

  if (layouts) {
    const pages = layouts.pages
    const fileNameArr = fs.readdirSync(pages)

    fileNameArr.forEach(file => {
      const filePath = path.join(pages, file)
      const fileData = fs.readFileSync(filePath)

      try {
        fs.mkdirSync(path.join(APP_PATH, `./extendedPages`))
      } catch (e) {}

      fs.writeFileSync(path.join(APP_PATH, `./extendedPages/${name}-${file}`), fileData)
    })
  }
}
