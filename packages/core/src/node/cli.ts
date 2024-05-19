#!/usr/bin/env node

import {
  initCommand,
  getReviliCache,
  createAddCommand,
  createStartCommand,
  createKitCommands,
  createUseCommand,
  createRemoveCommand,
  createListCommand,
  createInitKitCommand
} from './command/index.js'

// import {getMergedConfig} from './config/getMergedConfig.js'

;(async () => {
  // todo: revili.config.js 后期再重构
  // const config = await getMergedConfig()

  await initCommand(async program => {
    createAddCommand(program)
    createStartCommand(program)
    createUseCommand(program)
    createRemoveCommand(program)
    createListCommand(program)
    createInitKitCommand(program)

    const reviliCache = await getReviliCache()
    if (reviliCache.activeKit) {
      await createKitCommands(program)
    }
  })
})()
