import { navbar } from './navbar'
import { series } from './series'
import { bulletin } from './bulletin'

export const themeConfig = {
  style: '@vuepress-reco/style-default',
  logo: '/logo.svg',
  author: 'reco_luan',
  lastUpdatedText: '最后更新时间',
  series,
  navbar,
  bulletin,
  // vuePreviewsDir: './docs/.vuepress/vue-previews'
}