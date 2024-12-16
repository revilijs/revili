---
title: Node API
---

## defineKit

- Type: `(options: KitOptions) => Kit`
- Description: Declare the suite to register custom commands and GUI's local communication service, etc.
- Example:
  ```ts
  import { defineKit, useServerSocket, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    // The name of the kit
    name: 'revili-kit-demo',

    // The GUI client development framework, default vue, and will expand react, servlet, web component, etc.
    webFramework: 'vue'

    // Refer to https://vitejs.dev/config/
    viteOptions: {}

    // Register for services that can communicate with GUI
    registerService(server) {
      // ...
    },

    // Register the command
    registerCommand({ program }) {
      program.command('test').action(() => {
        console.log('You triggered the test command!！')
      })
    },
  })

  export default demoKit
  ```

## getKitData

- Type: `<T extends BasicRecord, K extends keyof KitData<T>>(prop?: K): Promise<KitData<T>[K] | null | KitData<T>>`
- Description: Get current kit data.
- Example:
  ```typescript
  import { getKitData } from '@revili/helpers/node'

  // Get all data
  const kitData = await getKitData<{ prop: string }>()
  // Get specific data
  const propOfKitData = await getKitData<{ prop: string }>('prop')
  ```

## updateKitData

- Type: `<T extends BasicRecord & Omit<KitData<T>, 'name' | 'installedAt'>>(partialData: Partial<KitData<T>>): Promise<void>`
- Description: Updates kit data to update only the specified fields.
- Example:
  ```typescript
  import { updateKitData } from '@revili/helpers/node'

  await updateKitData<{ version: string; description: string }>({
    version: '1.0.1',
    description: 'The description has been updated!'
  })
  ```

## updateKitDataItem

- Type: `<T extends BasicRecord, K extends Exclude<keyof T, 'name' | 'installedAt'>(key: K, value: T[K]): Promise<void>`
- Description: Updates kit data to update only the specified field.
- Example:
  ```typescript
  import { updateKitDataItem } from '@revili/helpers/node'

  await updateKitDataItem<{ version: string; description: string }>('version', '1.0.1')

## useServerSocket

- Type: `(server: ViteDevServer) => WebSocketServer | null`
- Description: The server communicates with the client.
- Example:
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

## ts declaration

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
