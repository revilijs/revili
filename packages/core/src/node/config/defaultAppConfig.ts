import dedaultPlugin from 'revili-plugin-default'

import type {AppOptions} from 'revili-shared/common'

export const defaultAppConfig: AppOptions = {
  devMode: false,
  layoutOptions: [],
  plugins: [dedaultPlugin],
}
