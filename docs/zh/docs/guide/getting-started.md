---
title: 快速开始
---

## 依赖环境

- [Node.js v18 & v20+](https://nodejs.org/en/)

## 尝试

```bash
npm install revili@next -g
revili add @revili/revili-kit-demo@next

# 'start' 命令是 revili 内置的
revili start

# 'path' 命令是从套件 @revili/revili-kit-demo
revili path
```

## 内置命令

### add

安装并激活套件。

```bash
revili add @revili/revili-kit-demo
```

### remove

移除套件。

```bash
revili remove @revili/revili-kit-demo
```

### use

激活套件。

```bash
revili use @revili/revili-kit-demo
```

### start

启动套件提供的 GUI 服务。

```bash
revili use @revili/revili-kit-demo
revili start
```

### ls/list

列出安装过的套件。

```bash
revili ls

# 或者
revili list
```
