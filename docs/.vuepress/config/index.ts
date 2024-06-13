import * as zhConfig from './zh'
import * as enConfig from './en'

export const themeConfig = {
  locales: {
    '/': {
      selectLanguageText: 'Languages',
      selectLanguageName: 'English',
      navbar: enConfig.navbar,
      series: enConfig.series,
      bulletin: enConfig.bulletin,
    },
    '/zh/': {
      selectLanguageText: '选择语言',
      selectLanguageName: '简体中文',
      lastUpdatedText: '最后更新时间',
      navbar: zhConfig.navbar,
      series: zhConfig.series,
      bulletin: zhConfig.bulletin,
    },
  },
  logo: '/revili.svg',
  author: 'reco_luan',
  docsRepo: 'https://github.com/revilijs/revili',
  docsBranch: 'main',
  docsDir: '/',
  componentsDir: './.vuepress/components',
}
