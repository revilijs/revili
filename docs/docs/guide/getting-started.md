---
title: Getting Started
---

## Environment

- [Node.js v18 & v20+](https://nodejs.org/en/)

## Try

```bash
npm install revili@next -g
revili add @revili/revili-kit-demo@next

# command 'start' is build-in from revili
revili start

# command 'path' is registered from @revili/revili-kit-demo
revili path
```

## Built-in commands

### add

Install the kit.

```bash
revili add @revili/revili-kit-demo
```

### remove

Remove the kit.

```bash
revili remove @revili/revili-kit-demo
```

### use

Switch the kit.

```bash
revili use @revili/revili-kit-demo
```

### start

Start the local services provided by the kit.

```bash
revili use @revili/revili-kit-demo
revili start
```

### ls/list

Check the added kits.

```bash
revili ls

# or
revili list
```
