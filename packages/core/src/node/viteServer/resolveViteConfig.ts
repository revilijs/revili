import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { mergeConfig } from 'vite'
import type { UserConfig } from 'vite'

import {default as vuePlugin} from '@vitejs/plugin-vue'
import {default as vueJsxPlugin} from '@vitejs/plugin-vue-jsx'

import tailwindcss from 'tailwindcss'
import postcssEach from 'postcss-each'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'

import { CACHE_FOLDER_PATH, CWD } from '../alias.js'
import {reviliPlugin} from './plugins/vitePluginRevili.js'
import { getReviliCache } from '../command/handleCache.js'
import {tailwindcssConfig} from './tailwindcssConfig/index.js'
import {virtualModulePlugin} from './plugins/vitePluginVirtualModule.js'

import type { Kit } from '@revili/shared/node'

export async function resolveViteConfig({ devMode, customKitDir }: { devMode: boolean, customKitDir: string }): Promise<UserConfig> {
  const { activeKit: activeKitName } = await getReviliCache();

  // const NODE_MODULES_PATH_OF_KIT = path.join(CACHE_FOLDER_PATH, `./node_modules`);
  const ACTIVE_KIT_DIR = path.join(CACHE_FOLDER_PATH, `./node_modules/${activeKitName}`);
  const CLIENT_DIR = customKitDir
    ? path.join(CWD, `${customKitDir}/client`)
    : path.join(devMode ? CWD : ACTIVE_KIT_DIR, `./dist/client`);
  const ACTIVE_KIT_ENTRY = customKitDir
    ? path.join(CWD, `${customKitDir}/node/index.js`)
    : path.join(devMode ? CWD : ACTIVE_KIT_DIR, `./dist/node/index.js`);

  const activeKit = (await import(pathToFileURL(ACTIVE_KIT_ENTRY) as unknown as string)).default as Kit;

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
