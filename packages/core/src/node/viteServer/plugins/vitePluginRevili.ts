import type {AliasOptions, Connect, Plugin, UserConfig} from 'vite'
import {APP_PATH} from '../../alias.js'

const cleanUrl = (url: string): string => url.replace(/#.*$/s, '').replace(/\?.*$/s, '')

export const reviliPlugin = (): Plugin => ({
  name: 'vite-plugin-revili',

  configureServer(server) {
    // todd 自动优化 config 文件
    // if (configPath) {
    //   server.watcher.add(configPath)
    // }

    // serve our index.html after vite history fallback
    return () => {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url && cleanUrl(req.url)
        if (url?.endsWith('.html')) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          let html = `<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/@fs/${APP_PATH}/app.js"></script>
</body>
</html>`
          html = await server.transformIndexHtml(url, html, req.originalUrl)
          res.end(html)
          return
        }
        next()
      })
    }
  },
})
