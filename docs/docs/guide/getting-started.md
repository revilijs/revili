---
title: 快速开始
---

## 依赖环境

- [Node.js v12+](https://nodejs.org/en/)

## 安装

**步骤1:** 在项目中创建依赖

:::: code-group
::: code-group-item PNPM
```bash
pnpm add @spider/sili@next -D
```
:::
::: code-group-item YARN
```bash
yarn add @spider/sili@next -D
```
:::
::::

**步骤2:** 在 package.json 中添加一些 scripts

```json
{
  "scripts": {
    "sili:dev": "sili dev",
  }
}
```

**步骤3:** 启动 GUI

:::: code-group
::: code-group-item PNPM
```json
pnpm sili:dev
```
:::
::: code-group-item YARN
```json
yarn sili:dev
```
:::
::::