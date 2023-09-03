import { navbar } from './navbar'
import { series } from './series'
import { bulletin } from './bulletin'

export const themeConfig = {
  style: '@vuepress-reco/style-default',
  logo: '/revili.svg',
  author: 'reco_luan',
  docsRepo: 'https://github.com/recoluan/revili',
  docsBranch: 'main',
  docsDir: '/docs',
  lastUpdatedText: '最后更新时间',
  series,
  navbar,
  bulletin,
  // vuePreviewsDir: './docs/.vuepress/vue-previews'
}
