/** @format */

import fs from 'node:fs'
import path from 'node:path'
import {APP_PATH} from '../alias.js'

import type {DefinePluginReturn} from 'vicli-shared/node'

export async function resolvePlugin(pluginPkg: string): Promise<DefinePluginReturn> {
  const pluginOptions = (await import(pluginPkg)).default

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
        fs.mkdirSync(path.join(APP_PATH, `./router/components`))
      } catch (e) {}

      fs.writeFileSync(path.join(APP_PATH, `./router/components/${name}${file}`), fileData)
    })
  }
}
