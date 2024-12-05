---
title: Node API
---

## defineKit

- 类型：`(options: KitOptions) => Kit`
- 描述：对套件进行声明，用来注册自定义命令和 GUI 的本地通信服务等。
- 案例：
  ```ts
  import { defineKit, useServerSocket, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    // 插件名称
    name: 'revili-kit-demo',

    // GUI 客户端开发框架，默认 vue，后面会拓展 react、servlet、web component 等
    webFramework: 'vue'

    // 参考 https://vitejs.dev/config/
    viteOptions: {}

    // 注册可以和 GUI 通信的服务
    registerService(server) {
      // ...
    },

    // 注册 command 命令
    registerCommand({ program }) {
      program.command('test').action(() => {
        console.log('你触发了 test 命令！')
      })
    },
  })

  export default demoKit
  ```

## KitOptions

```ts
interface KitOptions {
  name: string
  webFramework?: 'vue'
  viteOptions?: UserConfig
  registerService?: (server: ViteDevServer) => void
  registerCommand: (params: {program: CAC; reviliConfig?: ReviliConfig}) => void
}
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

  ## Kit Data Management

  ### 
