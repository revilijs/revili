import {createServer} from 'vite'
import {default as vuePlugin} from '@vitejs/plugin-vue'
import {default as vueJsxPlugin} from '@vitejs/plugin-vue-jsx'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssEach from 'postcss-each'
import {tailwindcssConfig} from './tailwindcssConfig/index.js'
import {reviliPlugin} from './plugins/vitePluginRevili.js'
import {virtualModulePlugin} from './plugins/vitePluginVirtualModule.js'
import {
  USER_DIR,
  DIST_CLIENT_PATH,
  PKG_ROOT_NODE_MODULES,
  PKG_ROOT_NODE_MODULES_DEVELOPMENT,
} from '../alias.js'
import {AppConfig} from '@revili/shared/common'


import path from 'node:path'
import { CACHE_FOLDER_PATH } from '../alias.js'
import { getReviliCache } from '../command/handleCache.js'

export async function createViteServer() {
  const { activeKit } = await getReviliCache()

  const clientPath = path.join(CACHE_FOLDER_PATH, `./node_modules/${activeKit}/dist/client`)
  const kitPath = path.join(CACHE_FOLDER_PATH, `./node_modules/${activeKit}/dist/node/index.js`)

  const node_modules = path.join(CACHE_FOLDER_PATH, `./node_modules`)

  const kit = (await import(kitPath)).default

  const server = await createServer({
    configFile: false,
    root: USER_DIR,
    server: {
      port: 6789,
      fs: {
        allow: [USER_DIR, DIST_CLIENT_PATH, clientPath],
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
      // @ts-ignore
      virtualModulePlugin('kit-config', kit),
      reviliPlugin(clientPath),
      kit.vitePlugin
    ],
    /**
     * 适配 Vue 等导出文件不是 ESM的情况
     * @desc 这需要被链接的依赖被导出为 ESM 格式。如果不是，那么你可以在配置里将此依赖添加到 optimizeDeps.include 和 build.commonjsOptions.include 这两项中
     * @link https://vitejs.cn/vite3-cn/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
     */
    optimizeDeps: {
      // tip: 实际引用可能不会添加 .js 后缀，所以 optimizeDeps.include 需要去掉
      include: [
        `${node_modules}/vue`,
        `${node_modules}/js-calendar`,
        `${node_modules}/date-fns/_lib/format/index.js`,
        `${node_modules}/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js`,
        `${node_modules}/date-fns/_lib/toInteger/index.js`,
      ],
    },
    build: {
      commonjsOptions: {
        include: [
          `${node_modules}/vue`,
          `${node_modules}/js-calendar`,
          `${node_modules}/date-fns/_lib/format/index.js`,
          `${node_modules}/date-fns/_lib/getTimezoneOffsetInMilliseconds/index.js`,
          `${node_modules}/date-fns/_lib/toInteger/index.js`,
          node_modules,
        ],
      },
    },
  })

  await server.listen()

  server.printUrls()
}
