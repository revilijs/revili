import { CAC } from 'cac'
import type { ViteDevServer, Plugin, UserConfig } from 'vite'
import type { ReviliConfig } from '../../common/config.js'

export interface KitOptions {
  name: string
  webFramework?:  'vue'
  viteOptions?: UserConfig
  registerService?: (server: ViteDevServer) => void
  registerCommand: (params: {program: CAC; reviliConfig?: ReviliConfig}) => void
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
