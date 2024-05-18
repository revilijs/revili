---
title: defineKit
---

## 简介

`Revili` 是一款脚手架的模块化方案，可以通过 `defineKit` 生成一个插件实例，对脚手架进行能力增强。

## 案例

```ts
import { join } from 'node:path'
import { defineKit, useServerSocket } from '@spider/sili-shared/node'

import type { Kit } from '@spider/sili-shared/node'

const demoKit: Kit = defineKit({
  // 插件名称
  name: 'sili-plugin-demo',

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

export default demoKit
```