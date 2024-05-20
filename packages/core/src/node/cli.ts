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

let customKitDir = ''

const args = process.argv.slice(2);
const lastArg = args[args.length - 1]
const matches = lastArg.match(/^--dir=(.+)/)

if (matches) {
  customKitDir = matches[1]
}

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

    await createKitCommands(program, customKitDir)
  })
})()
