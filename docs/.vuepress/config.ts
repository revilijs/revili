import {defineUserConfig} from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import {themeConfig} from './config/index'

export default defineUserConfig({
  title: 'Vili',
  base: '/',
  description: '一款基于 Vue3、Vite 的脚手架模块化解决方案。',
  theme: recoTheme({...themeConfig}),
  // debug: true,
})
