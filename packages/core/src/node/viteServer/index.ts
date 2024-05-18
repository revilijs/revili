import {createServer} from 'vite'
import { resolveViteConfig } from './resolveViteConfig.js'

export async function createViteServer({ devMode, customKitDir }: { devMode: boolean, customKitDir: string }) {
  const viteConfig = await resolveViteConfig({ devMode, customKitDir })

  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls()
}
