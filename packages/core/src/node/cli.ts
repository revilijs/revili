#!/usr/bin/env node

import {
  initCommand,
  getReviliCache,
  createAddCommand,
  createDevCommand,
  createKitCommands,
  createUseCommand,
  createRemoveCommand
} from './command/index.js'

// import {getMergedConfig} from './config/getMergedConfig.js'

;(async () => {
  // todo: revili.config.js 后期再重构
  // const config = await getMergedConfig()

  await initCommand(async program => {
    createAddCommand(program)
    createDevCommand(program)
    createUseCommand(program)
    createRemoveCommand(program)

    const reviliCache = await getReviliCache()
    if (reviliCache.activeKit) {
      await createKitCommands(program)
    }
  })
})()
