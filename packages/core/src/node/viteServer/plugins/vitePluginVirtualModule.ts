import type {Plugin} from 'vite'
import {ReviliConfig} from '@revili/shared/common'
import { toLowerCamelCase } from '../../utils/index.js'

export const virtualModulePlugin = (moduleKey: string, moduleValue: any): Plugin => {
  const virtualModuleId =`virtual:${moduleKey}`
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: `vite-plugin-virtual-${moduleKey}`,

    //@ts-ignore
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    //@ts-ignore
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const variableKey = toLowerCamelCase(moduleKey)
        const variablevalue = `JSON.parse(${JSON.stringify(JSON.stringify(moduleValue))})`

        return `export const ${variableKey} = ${variablevalue}`
      }
    },
  }
}
