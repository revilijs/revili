import { CAC } from 'cac'
import type { ViteDevServer, Plugin, UserConfig } from 'vite'
import type { AppConfig } from '../../common/config.js'

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

export interface KitOptions {
  name: string
  layouts?: Layouts
  webFramework?: string
  viteOptions?: UserConfig
  registerService?: (server: ViteDevServer) => void
  registerCommand: (params: {program: CAC; appConfig: AppConfig}) => void
}

export type Kit = Omit<KitOptions, 'registerService'> & {
  vitePlugin: () => Plugin
}

export function defineKit(options: KitOptions): Kit {
  const {name, webFramework, registerService, ...args} = options

  return {
    name,
    webFramework: webFramework ?? 'vue',
    vitePlugin: (): Plugin => ({
      name: `vite-plugin-${name}`,
      configureServer(server: ViteDevServer) {
        registerService && registerService(server)
      },
    }),
    ...args,
  }
}
