import dedaultPlugin from 'vicli-plugin-default'

import type {AppOptions} from 'vicli-shared/common'

export const defaultAppConfig: AppOptions = {
  devMode: false,
  layoutOptions: [],
  plugins: [dedaultPlugin],
}
