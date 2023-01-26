/** @format */

import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {routes} from './routes.js'
// @ts-ignore
import {appConfig} from 'virtual:custom-routes'
import {parseRoute} from './dynamicImportComponent.js'
import {DefinePluginReturn} from 'recli-shared/node'

const renderCustomRoutes = async () => {
  const customRoutes = appConfig.plugins.reduce((prev: Array<RouteRecordRaw>, next: DefinePluginReturn) => {
    const routes = parseRoute(next)
    return [...prev, ...routes]
  }, [])
  return customRoutes
}

export const createVueRouter = async () => {
  const customRoutes = await renderCustomRoutes()

  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [...routes, ...customRoutes], // `routes: routes` 的缩写
  })

  return router
}
