/** @format */

import {definePlugin, useServerSocket} from 'recli-shared/node'
import type {DefinePluginReturn} from 'recli-shared/node'
import path from 'node:path'
import {DIST_CLIENT_PATH} from './alias.js'

const metaManagerPlugin: DefinePluginReturn = definePlugin({
  name: 'recli-plugin-code-generator',

  layouts: {
    pages: path.join(DIST_CLIENT_PATH, './pages'),

    navbar: {
      route: '/code-generator',
      title: '出码管理',
    },

    sidebar: [
      {
        title: '出码管理',
        route: '/test',
      },
    ],
  },

  registerService: server => {
    const socket = useServerSocket(server)
    socket.send('codegenerator:say', 123)
    setTimeout(() => {
      socket.send('codegenerator:say', 456)
    }, 2000)
    setTimeout(() => {
      socket.send('codegenerator:say', 789)
    }, 4000)
  },

  registerCommand: ({program}) => {
    program.command('test-b').action(() => {
      console.log('code-generator')
    })
  },
})

export default metaManagerPlugin
