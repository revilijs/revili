---
title: Develop Kit
---

::: tip
If your kit is to be published to npm, please refer to **Standard Kit**; if your kit is only used in your own project, please refer to **Local Kit**.
:::

## Standard Kit

### Initialization

```
├── dist
│   ├── node
│   │   └── index.js
│   └── client
│   │   ├── main.js
│   │   └── App.vue
└── src
    ├── node
    │   └── index.ts
    └── client
        ├── main.ts
        └── App.vue
```

```bash
npm install revili@next -g
revili create:kit
```

### Development

The development of the kit is divided into two parts, **Custom Command** 和 **GUI**。

The two themselves are independent and not interdependent, and only one of the capabilities can be developed according to user habits; at the same time, they can also be used as different manifestations of connected functions, allowing users to choose the use method based on their own habits or interests.

`Revili` adopts the principle that conventions are greater than specifications to restrict the file structure of the kit:
  - `node` folder: Place an instance of the kit, declare the kit through `defineKit`, and use it to register custom commands and `Local Communication Service` for the GUI. For details, please refer to [Node API](/docs/api/node-api.html);
  - `client` folder: Place code related to the **User Operation Interface** of the GUI.

#### Custom Command

Register a custom command through `registerCommand`, `registerCommand` exposes an instance of [CAC](https://github.com/cacjs/cac) to the outside world.

**registerCommand**
- Type:
  ```ts
  ({ program: CAC, appConfig: AppConfig }) => void
  ```
- Example:
  ```ts
  import { defineKit, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    name: 'revili-kit-demo',

    registerCommand(program) {
      program.command('test').action(() => {
        console.log('You triggered the test command!')
      })
    },
  })

  export default demoKit
  ```

#### GUI

GUI development is divided into two parts, **User Operation Interface** and **Local Communication Service**.

##### User Operation Interface

The technical stack of the **User Operation Interface** is specified through the `webFramework`. Currently, only `vue` is supported, and `react`,`servlet`,`web component`, etc. will be supported later.

```ts
import { defineKit, type Kit } from 'revili/node'

const demoKit: Kit = defineKit({
  name: 'revili-kit-demo',

  webFramework: 'vue',
})

export default demoKit
```

Developing Web applications in the `client` folder is no different from traditional Web development. Note that the entry file uses `main. (ts|js)`. If you want to customize the development environment, you can configure it through `viteOptions`. For configuration details, please refer to [Vite](https://vitejs.dev/config/).

```ts
import { defineKit, type Kit } from 'revili/node'

const demoKit: Kit = defineKit({
  name: 'revili-kit-demo',

  webFramework: 'vue',

  viteOptions: {
    // ...
  }
})

export default demoKit
```

##### Local Communication Service

Register local services that communicate with the **User Operation Interface** through `registerService`, and communicate with the **User Operation Interface** through `useServerSocket`.

**registerService**
- Type:
  ```ts
  (server: ViteDevServer) => void
  ```
- Example:
  ```ts
  import { defineKit, useServerSocket, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    name: 'revili-kit-demo',

    registerService: server => {
      const socket = useServerSocket(server)

      // Listen for instructions sent by the user operation interface client:message
      socket?.on('client:message', (data: any) => {
        if (data === 'USER_PATH') {
          const userPath = getUserPath()
          // Send server command server:message
          socket?.send('server:message', userPath)

          return
        }
      })
    },
  })

  export default demoKit
  ```

In the **User Operation Interface**, communicate with local services through `useClientSocket`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useClientSocket } from 'revili/client'

const socket = useClientSocket()
const msgFromServer = ref('click button to get')

// Listen for commands from local services server:message
socket?.on('server:message', (data: any) => {
  msgFromServer.value = data
})

const getCurrnetPath = () => {
  // Send a command to the local service client:message
  socket?.send('client:message', 'USER_PATH')
}
</script>

<template>
  <div>
    <button @click="getCurrnetPath">get user path</button>
    <div>user path: {{ msgFromServer }}</div>
  </div>
</template>
```

### Debug

The products of the `Standard Kit` are stored under the `dist` folder, so add `--dir=./dist` parameter when you need to execute a command in the root directory of the kit.

:::warning
Modifications to the `User Operation Interface` do not require restarting the service, and modifications to the `Local Communication Service` require re-execution of the start command.
:::

```bash
# Local Develop Server
npm run dev

# GUI Debug
revili start --dir=./dist

# Command Debug
revili command-registered-by-kit --dir=./dist
```

Because the `--dir` parameter has been added, it needs to be processed:
1. Add the definition of the `--dir` parameter
   ```ts
   program
      .command('cunstom-command')
      .option('--dir <dir>', 'Specify the entry file path for kit')
      .action(() => {
        // ...
      })
   ```
2. Setting allows unknown parameters
   ```ts
   program
      .command('cunstom-command')
      .allowUnknownOptions()
      .action(() => {
        // ...
      })
   ```

### Publish

```bash
# Build
npm run build

# Publish
npm run publish
```

## Local Kit

### Initial

```
├── node
│   └── index.js
└── client
    ├── main.js
    └── App.vue
```

### Develop

Refer to **Standard Kit**。

### Debug

Files for the `Local Kit` are stored in the root folder, so add `--dir=./` parameter when you need to execute a command in the root directory of the kit.

:::warning
Modifications to the user operation interface do not require restarting the service, and modifications to the `Local Communication Service` require re-execution of the `start` command.
:::

```bash
# GUI Debuger
revili start --dir=./

# Command Debug
revili command-registered-by-kit --dir=./
```

Because the `--dir` parameter has been added, it needs to be processed. For details, please refer to the **Standard Kit**.

### Publish

No need to pay attention.
