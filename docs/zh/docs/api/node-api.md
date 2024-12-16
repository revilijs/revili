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

## getKitData

- 类型：`<T extends BasicRecord, K extends keyof KitData<T>>(prop?: K): Promise<KitData<T>[K] | null | KitData<T>>`
- 描述：获取当前 kit 的数据。
- 案例：
  ```typescript
  import { getKitData } from 'revili/node'

  // 获取所有数据
  const kitData = await getKitData<{ prop: string }>()
  // 获取指定数据
  const propOfKitData = await getKitData<{ prop: string }>('prop')
  ```

## updateKitData

- 类型：`<T extends BasicRecord & Omit<KitData<T>, 'name' | 'installedAt'>>(partialData: Partial<KitData<T>>): Promise<void>`
- 描述：更新 kit 数据，只更新指定的字段。
- 案例：
  ```typescript
  import { updateKitData } from 'revili/node'

  await updateKitData<{ version: string; description: string }>({
    version: '1.0.1',
    description: '更新后的描述'
  })
  ```

## updateKitDataItem

- 类型：`<T extends BasicRecord, K extends Exclude<keyof T, 'name' | 'installedAt'>(key: K, value: T[K]): Promise<void>`
- 描述：更新 kit 数据，仅更新指定的字段。
- 案例：
  ```typescript
  import { updateKitDataItem } from '@revili/helpers/node'

  await updateKitDataItem<{ version: string; description: string }>('version', '1.0.1')
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

## ts 声明

```ts
interface KitOptions {
  name: string
  webFramework?: 'vue'
  viteOptions?: UserConfig
  registerService?: (server: ViteDevServer) => void
  registerCommand: (params: {program: CAC; reviliConfig?: ReviliConfig}) => void
}

type BasicRecord = Record<string | number | symbol, any>

type KitData<T extends BasicRecord = BasicRecord> = {
  version?: string
  description?: string
} & T
```
