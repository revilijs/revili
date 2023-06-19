import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * Resolve conventional user config file path
 */
export const resolveUserConfig = async (cwd = process.cwd()): Promise<Record<string, any>> => {
  const userConfigPath = [
    path.resolve(cwd, 'revili.config.ts'),
    path.resolve(cwd, 'revili.config.js'),
    path.resolve(cwd, 'revili.config.mjs'),
  ].find(item => fs.existsSync(item))

  return userConfigPath ? (await import(userConfigPath)).default : {}
}
