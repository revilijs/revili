---
title: 快速开始
---

## 依赖环境

- [Node.js v18 & v20+](https://nodejs.org/en/)

## Try

```bash
npm install revili@next -g
revili add @revili/revili-kit-default@next

# command 'start' is registered from revili
revili start

# command 'path' is registered from @revili/revili-kit-default
revili path
```

## Built-in commands

### add

Install the kit.

```bash
revili add @revili/revili-kit-default
```

### remove

Remove the kit.

```bash
revili remove @revili/revili-kit-default
```

### use

Switch the kit.

```bash
revili use @revili/revili-kit-default
```

### start

Start the local services provided by the kit.

```bash
revili use @revili/revili-kit-default
revili start
```

### ls/list

Check the added kits.

```bash
revili ls

# or
revili list
```
