import {DefinePluginReturn} from '@revili/shared/node'
import {defineAsyncComponent, App} from 'vue'
import {RouteRecordRaw} from 'vue-router'

export function getModules() {
  // @ts-ignore
  const components = import.meta.glob('../extendedPages/*.vue')
  return components
}

export function getComponents() {
  // @ts-ignore
  const components = import.meta.globEager('./extendedPages/*.vue')
  return components
}

// 自动注册组件
export function asyncComponent(app: App<Element>, fileGlob: string): void {
  const modules = getModules()
  const components = getComponents()
  Object.keys(modules).forEach((key: string) => {
    const viewSrc = components[key]
    const file = viewSrc.default
    if (!file.isComponents) return
    const AsyncComponent = defineAsyncComponent(modules[key])
    app.component(file.name, AsyncComponent)
  })
}

// 自动注册路由
export function parseRoute(reviliPlugin: DefinePluginReturn): Array<RouteRecordRaw> {
  let parsedRoute: Array<RouteRecordRaw> = []
  const navbarPath = reviliPlugin?.layouts?.navbar.route

  const modules = getModules()

  Object.keys(modules).forEach(key => {
    const fileName = getFileNameByPath(reviliPlugin.name, key)

    parsedRoute.push({
      path: `${navbarPath}/${fileName}`,
      name: fileName,
      component: modules[key],
    })
  })

  return parsedRoute
}

export function getFileNameByPath(name: string, filePath: string) {
  const regexp = new RegExp(`(${name})-([\\w\\d-_]*)(\.vue)`)
  const result = filePath.match(regexp)

  return result ? result[2] : ''
}
