---
title: 开发套件
---

::: tip
如果您的套件要发布到 npm，请参考 **标准套件**；如果您的套件仅用于自己的项目中，请参考 **本地套件**。
:::

## 标准套件

### 初始化

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

### 开发

套件的开发分为两部分，**自定义命令** 和 **GUI**。

两者本身是独立的，不相互依赖，可以根据用户习惯只开发其中一种能力；同时也可以作为相通功能的不同表现形式，让用户根据自己的习惯或兴趣去选择使用方式。

`Revili` 采用约定大于规范的原则，对套件的文件结构进行了约束：
  - `node` 文件夹：放置套件的实例，通过 `defineKit` 对套件进行声明，用来注册自定义命令和 GUI 的本地通信服务等，详情请参考 [Node API](/zh/docs/api/node-api.html)；
  - `client` 文件夹：放置 GUI 的用户操作界面相关的代码。

#### 自定义命令

通过 `registerCommand` 注册自定义命令，`registerCommand` 对外暴露了 [CAC](https://github.com/cacjs/cac) 实例。

**registerCommand**
- 类型签名：
  ```ts
  ({ program: CAC, appConfig: AppConfig }) => void
  ```
- 示例：
  ```ts
  import { defineKit, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    name: 'revili-kit-demo',

    registerCommand(program) {
      program.command('test').action(() => {
        console.log('你触发了 test 命令！')
      })
    },
  })

  export default demoKit
  ```

#### GUI

GUI 开发又分为两部分，**用户操作界面** 和 **本地通信服务**。

##### 用户操作界面

通过 `webFramework` 指定用户操作界面的技术栈，当前仅支持 `vue`，后面会支持 `react`、`servlet`、`web component` 等。

```ts
import { defineKit, type Kit } from 'revili/node'

const demoKit: Kit = defineKit({
  name: 'revili-kit-demo',

  webFramework: 'vue',
})

export default demoKit
```

在 `client` 文件夹中对 Web 应用进行开发，这里就和传统 Web 开发没有任何什么区别了，注意入口文件约定使用 `main.(ts|js)`。如果想对开发环境进行自定义，通过 `viteOptions` 进行配置即可，配置详情参考 [Vite](https://vitejs.dev/config/)。

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

##### 本地通信服务

通过 `registerService` 注册与用户操作界面进行通信的本地服务，通过 `useServerSocket` 与用户操作界面进行通信。

**registerService**
- 类型签名：
  ```ts
  (server: ViteDevServer) => void
  ```
- 示例：
  ```ts
  import { defineKit, useServerSocket, type Kit } from 'revili/node'

  const demoKit: Kit = defineKit({
    name: 'revili-kit-demo',

    registerService: server => {
      const socket = useServerSocket(server)

      // 监听用户操作界面发来的指令 client:message
      socket?.on('client:message', (data: any) => {
        if (data === 'USER_PATH') {
          const userPath = getUserPath()
          // 发送服务端指令 server:message
          socket?.send('server:message', userPath)

          return
        }
      })
    },
  })

  export default demoKit
  ```

在用户操作界面，通过 `useClientSocket` 与本地服务进行通信。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useClientSocket } from 'revili/client'

const socket = useClientSocket()
const msgFromServer = ref('click button to get')

// 监听本地服务发来的指令 server:message
socket?.on('server:message', (data: any) => {
  msgFromServer.value = data
})

const getCurrnetPath = () => {
  // 向本地服务发送指令 client:message
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

### 调试

标准套件的产物存放在 `dist` 文件夹下，所以在需要在套件根目录执行命令时添加 `--dir=./dist` 参数。

:::warning
用户操作界面的修改不需要重启服务，本地通信服务的修改需要重新执行 start 命令。
:::

```bash
# 代码实时编译
npm run dev

# GUI 调试
revili start --dir=./dist

# 命令调试
revili command-registered-by-kit --dir=./dist
```

因为增加了 `--dir` 参数，需要对该参数进行处理：
1. 增加 `--dir` 参数的定义
   ```ts
   program
      .command('cunstom-command')
      .option('--dir <dir>', 'Specify the entry file path for kit')
      .action(() => {
        // ...
      })
   ```
2. 设置允许未知的参数
   ```ts
   program
      .command('cunstom-command')
      .allowUnknownOptions()
      .action(() => {
        // ...
      })
   ```

### 发布

```bash
# 编译
npm run build

# 发布
npm run publish
```

## 本地套件

### 初始化

```
├── node
│   └── index.js
└── client
    ├── main.js
    └── App.vue
```

### 开发

参考 **标准套件**。

### 调试

本地套件的文件存放在根目录文件夹下，所以在需要在套件根目录执行命令时添加 `--dir=./` 参数。

:::warning
用户操作界面的修改不需要重启服务，本地通信服务的修改需要重新执行 start 命令。
:::

```bash
# GUI 调试
revili start --dir=./

# 命令调试
revili command-registered-by-kit --dir=./
```

因为增加了 `--dir` 参数，需要对该参数进行处理，具体请参考 **标准套件**。

### 发布

无需关注。
