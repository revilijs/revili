<p align="center">
  <a href="https://revili.com/en/" target="_blank" rel="noopener noreferrer">
    <img width="200" src="https://github.com/vuepress-reco/vuepress-theme-reco/assets/18067907/e60820b4-cb04-4aea-95ba-83550f29f2cf" alt="logo" />
  </a>
</p>
<br/>

# revili
A command and GUI integration tool based on vite.

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

## Kit

Kit is a fully functional revili extension package, that includes commands, client and server of GUI. Kit are independent of each other.