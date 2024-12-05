import {defaultConfig} from './defaultConfig.js'
import {resolveUserConfig} from './resolveUserConfigConventionalPath.js'
import type {ReviliConfig } from '@revili/helpers/shared'

export async function getMergedConfig(): Promise<ReviliConfig> {
  const userConfig = await resolveUserConfig()

  const {plugins: userConfigPlugins = []} = userConfig
  const {plugins: defaultConfigPlugins} = defaultConfig

  const reviliConfig: ReviliConfig = {
    ...defaultConfig,
    ...userConfig,
    plugins: [...defaultConfigPlugins, ...userConfigPlugins],
  }

  const resolvedConfig = {
    ...reviliConfig,
  } as unknown as ReviliConfig

  return resolvedConfig
}
