/** @format */

import {CAC} from 'cac'
import type {ViteDevServer, Plugin} from 'vite'
import type {AppConfig} from '../../common/config.js'

interface SidebarItem {
  icon?: string
  title: string
  route: string
}

interface NavbarItem {
  route: string
  icon?: string
  title: string
}

interface Layouts {
  pages: string
  navbar: NavbarItem
  sidebar: Array<SidebarItem>
}

export interface PluginOptions {
  name: string
  layouts?: Layouts
  registerService?: (server: ViteDevServer) => void
  registerCommand: (params: {program: CAC; appConfig: AppConfig}) => void
}

export type DefinePluginReturn = Omit<PluginOptions, 'registerService'> & {
  vitePlugin: () => Plugin
}

export function definePlugin(options: PluginOptions): DefinePluginReturn {
  const {name, registerService, ...args} = options

  return {
    name,
    vitePlugin: (): Plugin => ({
      name: `vite-plugin-${name}`,
      configureServer(server: ViteDevServer) {
        registerService && registerService(server)
      },
    }),
    ...args,
  }
}
