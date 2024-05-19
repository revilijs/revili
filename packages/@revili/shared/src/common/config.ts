type Plugin = Record<string, any>

export interface AppOptions<T> {
  devMode: boolean
  plugins: Array<T>
  [prop: string]: any
}

export type AppConfig = AppOptions<Plugin>
