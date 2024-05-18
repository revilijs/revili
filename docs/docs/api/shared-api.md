---
title: 共享 API
---

## Node API

### defineKit

`Revili` 是一款脚手架的模块化方案，可以通过 `defineKit` 生成一个插件实例，对脚手架进行能力增强。

**案例**

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

### useServerSocket

服务端通信 API。

```ts
import {defineKit, useServerSocket} from '@revili/shared/node'
import type {Kit} from '@revili/shared/node'

const examplePlugin: Kit = defineKit({
  name: 'revili-kit-example',

  registerService: server => {
    const socket = useServerSocket(server)

    socket?.on('event-name', (data: any) => {
      // do something
    })

    socket?.send('event-name', 'message')
  }
})

export default examplePlugin
```

## Client API

### useClientSocket

```ts
import { useClientSocket } from '@revili/shared/client'

const socket = useClientSocket()

socket?.on('event-name', (data: any) => {
  // do something
})

socket?.send('event-name', 'message')
```

## TS Types