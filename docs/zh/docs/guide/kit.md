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

```bash
npm install revili@next -g
revili create:kit
```

### 开发

#### WEB 客户端开发

#### server function 注册

#### command 注册

### 调试

```bash
# GUI 调试
revili start --dir=./dist

# 命令调试
revili command-registered-by-kit --dir=./dist
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

```bash
# GUI 调试
revili start --dir=./

# 命令调试
revili command-registered-by-kit --dir=./
```

### 发布

无需关注。
