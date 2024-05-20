import { mergeConfig } from 'vite'
import type { UserConfig } from 'vite'

import {default as vuePlugin} from '@vitejs/plugin-vue'
import {default as vueJsxPlugin} from '@vitejs/plugin-vue-jsx'

import tailwindcss from 'tailwindcss'
import postcssEach from 'postcss-each'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'

import {reviliPlugin} from './plugins/vitePluginRevili.js'
import {tailwindcssConfig} from './tailwindcssConfig/index.js'
import {virtualModulePlugin} from './plugins/vitePluginVirtualModule.js'

import { getActiveKit } from '../utils/index.js'

export async function resolveViteConfig(customKitDir: string): Promise<UserConfig> {
  const { activeKit, CLIENT_DIR } = await getActiveKit(customKitDir)

  if (!activeKit) {
    process.exit(1)
  }

  const vitePlugins = [
    virtualModulePlugin('kit-config', activeKit),
    reviliPlugin(CLIENT_DIR),
    activeKit.vitePlugin()
  ]

  if (activeKit.webFramework === 'vue') {
    vitePlugins.push(
      vuePlugin({
        // @ts-ignore
        babel: {
          plugins: [
            "@babel/plugin-transform-optional-chaining",
            "@babel/plugin-transform-nullish-coalescing-operator"
          ],
        },
      }),
      vueJsxPlugin()
    )
  }

  return mergeConfig(
    {
      configFile: false,
      root: CLIENT_DIR,
      server: {
        port: 6789,
        fs: {
          allow: [CLIENT_DIR],
        },
      },
      css: {
        postcss: {
          plugins: [
            postcssImport,
            tailwindcssNesting,
            // @ts-ignore
            tailwindcss(tailwindcssConfig),
            autoprefixer({}),
            postcssEach,
          ],
        },
      },
      plugins: vitePlugins,
    },
    activeKit.viteOptions ?? {}
  )
}
