import type {Plugin} from 'vite'
import {AppConfig} from 'revili-shared/common'

export const virtualModulePlugin = (appConfig: AppConfig): Plugin => {
  const virtualModuleId = 'virtual:custom-routes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-virtual-custom-routes',

    //@ts-ignore
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    //@ts-ignore
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const appConfig = JSON.parse(${JSON.stringify(JSON.stringify(appConfig))})`
      }
    },
  }
}
