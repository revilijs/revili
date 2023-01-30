import type {DefinePluginReturn} from '../node/index.js'

export interface SidebarItem {
  title: string
  route: string
  icon?: string
}

export interface LayoutOption {
  title: string
  route: string
  children: SidebarItem[]
  icon?: string
}

export interface AppOptions<T = DefinePluginReturn> {
  devMode: boolean
  layoutOptions: LayoutOption[]
  plugins: Array<T>
  [prop: string]: any
}

export type AppConfig = AppOptions<DefinePluginReturn>
