---
title: definePlugin
---

## 简介

`Sili` 是一款脚手架的模块化方案，可以通过 `definePlugin` 生成一个插件实例，对脚手架进行能力增强。

## 案例

```ts
import { join } from 'node:path'
import { definePlugin, useServerSocket } from '@spider/sili-shared/node'

import type { DefinePluginReturn } from '@spider/sili-shared/node'

const demoPlugin: DefinePluginReturn = definePlugin({
  // 插件名称
  name: 'sili-plugin-demo',

  // GUI 页面布局相关 
  layouts: {
    // 存放页面 vue 组件的文件夹的绝对路径
    pages: join(DIST_CLIENT_PATH, './pages'),

    // 导航栏配置
    navbar: {
      route: '/navabr',
      title: '导航栏',
    },

    // 侧边栏配置
    sidebar: [
      {
        title: '侧边栏1',
        route: '/sidebar1',
      },
    ],
  },

  // 注册可以和 GUI 通信的服务
  registerService: server => {
    // ...
  },

  // 注册 command 命令
  registerCommand: program => {
    program.command('test').action(() => {
      console.log('你触发了 spider test 命令！')
    })
  },
})

export default demoPlugin
```