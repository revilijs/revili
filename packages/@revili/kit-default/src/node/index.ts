import {definePlugin, useServerSocket} from '@revili/shared/node'
import type {DefinePluginReturn} from '@revili/shared/node'

const defaultPlugin: DefinePluginReturn = definePlugin({
  name: 'revili-kit-default',

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
    program.command('test').action(() => {
      console.log('[revili] apply test command in @revili/revili-kit-default')
    })
  },
})

export default defaultPlugin
