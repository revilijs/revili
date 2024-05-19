---
title: Node API
---

## defineKit

- 类型：`(options: KitOptions) => Kit`
- 描述：`Revili` 是一款脚手架的模块化方案，可以通过 `defineKit` 生成一个插件实例，对脚手架进行能力增强。
- 案例：
  ```ts
  import { defineKit, useServerSocket, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    // 插件名称
    name: 'revili-kit-demo',

    // 注册可以和 GUI 通信的服务
    registerService(server) {
      // ...
    },

    // 注册 command 命令
    registerCommand(program) {
      program.command('test').action(() => {
        console.log('你触发了 test 命令！')
      })
    },
  })

  export default demoKit
  ```

## useServerSocket

- 类型：`(server: ViteDevServer) => WebSocketServer | null`
- 描述：服务端与客户端的通信 API。
- 案例：
  ```ts
  import {defineKit, useServerSocket, type Kit} from 'revili/node'

  const demoKit: Kit = defineKit({
    name: 'revili-kit-demo',

    registerService(server) {
      const socket = useServerSocket(server)

      socket?.on('event-name', (data: any) => {
        // ...
      })

      socket?.send('event-name', 'message')
    }
  })

  export default demoKit
  ```
