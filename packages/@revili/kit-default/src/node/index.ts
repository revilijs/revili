import {definePlugin, useServerSocket} from '@revili/shared/node'
import type {DefinePluginReturn} from '@revili/shared/node'

import { USER_PATH } from '../constants/index.js'

const defaultPlugin: DefinePluginReturn = definePlugin({
  name: 'revili-kit-default',

  registerService: server => {
    const socket = useServerSocket(server)

    socket?.on('client:message', (data: any) => {
      if (data === USER_PATH) {
        const userPath = getUserPath()
        socket?.send('server:message', userPath)

        return
      }
    })
  },

  registerCommand: ({program}) => {
    program.command('path').action(() => {
      const userPath = getUserPath()
      console.log(`[revili] user path: ${userPath}`)
    })
  },
})

function getUserPath() {
  const userPath = process.cwd()
  return userPath
}

export default defaultPlugin
