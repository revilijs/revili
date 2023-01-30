import {defaultAppConfig} from './defaultAppConfig.js'
import {resolvePlugin} from './resolvePlugin.js'
import {resolveUserConfig} from './resolveUserConfigConventionalPath.js'

import {DefinePluginReturn} from 'vicli-shared/node'
import type {AppOptions, AppConfig, LayoutOption, SidebarItem} from 'vicli-shared/common'

export async function resolveAppConfig(): Promise<AppConfig> {
  const userConfig = await resolveUserConfig()

  const {plugins: userConfigPlugins = []} = userConfig
  const {plugins: defaultConfigPlugins} = defaultAppConfig

  const appConfig: AppOptions = {
    ...defaultAppConfig,
    ...userConfig,
    plugins: [...defaultConfigPlugins, ...userConfigPlugins],
  }

  const resolvedPlugins = await Promise.all(appConfig.plugins.map(plugin => resolvePlugin(plugin)))
  const layoutOptions = parseLayoutOptions(resolvedPlugins)

  const resolvedConfig = {
    ...appConfig,
    plugins: resolvedPlugins,
    layoutOptions,
  } as unknown as AppConfig

  return resolvedConfig
}

function parseLayoutOptions(plugins: DefinePluginReturn[]): LayoutOption[] {
  const options: LayoutOption[] = plugins.reduce((prev: LayoutOption[], plugin: DefinePluginReturn) => {
    if (plugin.layouts) {
      const {sidebar, navbar, pages} = plugin.layouts || {}
      const sidebarOptions: any[] = sidebar.map(item => {
        const sidebarItem: any = {
          href: `${navbar.route}${item.route}`,
          key: `${navbar.route}${item.route}`,
          label: item.title,
        }

        if (item.icon) {
          sidebarItem.icon = item.icon
        }

        return sidebarItem
      })

      const layoutOpt: LayoutOption = {
        title: plugin?.layouts?.navbar?.title || '',
        route: sidebarOptions[0].href as string,
        children: sidebarOptions,
      }

      prev.push(layoutOpt)
    }

    return prev
  }, [])

  return options
}
