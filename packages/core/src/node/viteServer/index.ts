import {createServer} from 'vite'
import { resolveViteConfig } from './resolveViteConfig.js'

export async function createViteServer(customKitDir: string) {
  const viteConfig = await resolveViteConfig(customKitDir)

  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls()
}
