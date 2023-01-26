/** @format */

import {createServer} from 'vite'
import {default as vuePlugin} from '@vitejs/plugin-vue'
import {default as vueJsxPlugin} from '@vitejs/plugin-vue-jsx'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssEach from 'postcss-each'
import {tailwindcssConfig} from './tailwindcssConfig/index.js'
import {recliPlugin} from './plugins/vitePluginRecli.js'
import {virtualModulePlugin} from './plugins/vitePluginVirtualModule.js'
import {USER_PROJECT_ROOT, DIST_CLIENT_PATH} from '../alias.js'
import {AppConfig} from 'recli-shared/common'

export async function createViteServer(appConfig: AppConfig) {
  const userVitePlugins = appConfig.plugins.map(plugin => plugin.vitePlugin())
  const server = await createServer({
    configFile: false,
    root: USER_PROJECT_ROOT,
    server: {
      port: 6789,
      fs: {
        allow: [USER_PROJECT_ROOT, DIST_CLIENT_PATH],
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
    // @ts-ignore
    plugins: [
      // @ts-ignore
      vuePlugin({
        babel: {
          plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
        },
      }),
      // @ts-ignore
      vueJsxPlugin(),
      virtualModulePlugin(appConfig),
      recliPlugin(),
      ...userVitePlugins,
    ],
    /**
     * 适配 Vue、MTD-Vue 导出文件不是 ESM的情况
     * @desc 这需要被链接的依赖被导出为 ESM 格式。如果不是，那么你可以在配置里将此依赖添加到 optimizeDeps.include 和 build.commonjsOptions.include 这两项中
     * @link https://vitejs.cn/vite3-cn/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
     */
    optimizeDeps: {
      include: ['@ss/mtd-vue-next', 'vue'],
    },
    build: {
      commonjsOptions: {
        include: [/@ss\/mtd-vue-next/, 'vue', /node_modules/],
      },
    },
  })

  await server.listen()

  server.printUrls()
}
