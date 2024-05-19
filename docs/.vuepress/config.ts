import {defineUserConfig} from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import { viteBundler } from '@vuepress/bundler-vite'
import {themeConfig} from './config/index'

export default defineUserConfig({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Revili',
      description: 'A command and GUI integration tool based on vite.',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Revili',
      description: '一款基于 Vite 的脚手架模块化解决方案。',
    },
  },
  bundler: viteBundler({}),
  theme: recoTheme(themeConfig),
  // debug: true,
})
