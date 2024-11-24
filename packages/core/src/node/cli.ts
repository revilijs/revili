#!/usr/bin/env node

import {
  initCommand,
  getReviliCache,
  createAddCommand,
  createUseCommand,
  createTestCommand,
  createKitCommands,
  createListCommand,
  createStartCommand,
  createRemoveCommand,
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
    createUseCommand(program)
    createListCommand(program)
    createTestCommand(program)
    createStartCommand(program)
    createRemoveCommand(program)
    createInitKitCommand(program)

    await createKitCommands(program, customKitDir)
  })
})()
