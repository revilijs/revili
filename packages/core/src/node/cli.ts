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

/**
 * todo ：
 * 1. 通过 process.argv 判断用户是否增加了参数 --dir
 * 2. 如果带了参数，说明是本地套件，直接通过 dir 值来获取套件实例
 * 3. 套件实例传递给 createKitCommands、createStartCommand
 * 4. 增加一个 getCurrentKit 方法，判断获取本地 kit 或 cache kit
 */

const args = process.argv.slice(2);
console.log(args);

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
