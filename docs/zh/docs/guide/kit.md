---
title: 开发套件
---

::: tip
Revili 允许您通过套件扩展功能。套件 KIT 是一个功能齐全的 Revili 扩展包，包括命令、客户端和服务器的图形用户界面。套件 KIT是相互独立的。
:::

::: warning
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

#### GUI 开发

#### command 注册

### 调试

标准套件的产物存放在 `dist` 文件夹下，所以在需要在套件根目录执行命令时添加 `--dir=./dist` 参数。

```bash
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

```bash
# GUI 调试
revili start --dir=./

# 命令调试
revili command-registered-by-kit --dir=./
```

因为增加了 `--dir` 参数，需要对该参数进行处理，具体请参考 **标准套件**。

### 发布

无需关注。
