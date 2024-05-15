import path from 'node:path'
import { pathToFileURL } from 'node:url'

import {createServer} from 'vite'
import {default as vuePlugin} from '@vitejs/plugin-vue'
import {default as vueJsxPlugin} from '@vitejs/plugin-vue-jsx'

import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssEach from 'postcss-each'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'

import {tailwindcssConfig} from './tailwindcssConfig/index.js'
import {reviliPlugin} from './plugins/vitePluginRevili.js'
import {virtualModulePlugin} from './plugins/vitePluginVirtualModule.js'
import { CACHE_FOLDER_PATH, CWD } from '../alias.js'
import { getReviliCache } from '../command/handleCache.js'

export async function createViteServer({ devMode, customKitDir }: { devMode: boolean, customKitDir: string }) {
  const { activeKit: activeKitName } = await getReviliCache();

  // const NODE_MODULES_PATH_OF_KIT = path.join(CACHE_FOLDER_PATH, `./node_modules`);
  const ACTIVE_KIT_DIR = path.join(CACHE_FOLDER_PATH, `./node_modules/${activeKitName}`);
  const CLIENT_DIR = customKitDir
    ? path.join(CWD, `${customKitDir}/client`)
    : path.join(devMode ? CWD : ACTIVE_KIT_DIR, `./dist/client`);
  const ACTIVE_KIT_ENTRY = customKitDir
    ? path.join(CWD, `${customKitDir}/node/index.js`)
    : path.join(devMode ? CWD : ACTIVE_KIT_DIR, `./dist/node/index.js`);

  const activeKit = (await import(pathToFileURL(ACTIVE_KIT_ENTRY) as unknown as string)).default;

  const server = await createServer({
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
    plugins: [
      // @ts-ignore
      vuePlugin({
        // @ts-ignore
        babel: {
      // @ts-ignore
          plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
        },
      }),
      // @ts-ignore
      vueJsxPlugin(),
      virtualModulePlugin('kit-config', activeKit),
      reviliPlugin(CLIENT_DIR),
      activeKit.vitePlugin()
    ],
    /**
     * 适配 Vue 等导出文件不是 ESM的情况
     * @desc 这需要被链接的依赖被导出为 ESM 格式。如果不是，那么你可以在配置里将此依赖添加到 optimizeDeps.include 和 build.commonjsOptions.include 这两项中
     * @link https://vitejs.cn/vite3-cn/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
     */
    optimizeDeps: {
      // tip: 实际引用可能不会添加 .js 后缀，所以 optimizeDeps.include 需要去掉
      include: [
        // `${NODE_MODULES_PATH_OF_KIT}/vue`,
      ],
    },
    build: {
      commonjsOptions: {
        include: [
          // `${NODE_MODULES_PATH_OF_KIT}/vue`,
          // NODE_MODULES_PATH_OF_KIT,
        ],
      },
    },
  })

  await server.listen()

  server.printUrls()
}
