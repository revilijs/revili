/** @format */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * Resolve conventional user config file path
 */
export const resolveUserConfig = async (cwd = process.cwd()): Promise<Record<string, any>> => {
  const userConfigPath = [
    path.resolve(cwd, 'vicli.config.ts'),
    path.resolve(cwd, 'vicli.config.js'),
    path.resolve(cwd, 'vicli.config.mjs'),
  ].find(item => fs.existsSync(item))

  return userConfigPath ? (await import(userConfigPath)).default : {}
}
