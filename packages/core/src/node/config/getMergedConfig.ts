import {defaultConfig} from './defaultConfig.js'
import {resolveUserConfig} from './resolveUserConfigConventionalPath.js'
import type {AppConfig } from '@revili/shared/common'

export async function getMergedConfig(): Promise<AppConfig> {
  const userConfig = await resolveUserConfig()

  const {plugins: userConfigPlugins = []} = userConfig
  const {plugins: defaultConfigPlugins} = defaultConfig

  const appConfig: AppConfig = {
    ...defaultConfig,
    ...userConfig,
    plugins: [...defaultConfigPlugins, ...userConfigPlugins],
  }

  const resolvedConfig = {
    ...appConfig,
  } as unknown as AppConfig

  return resolvedConfig
}
