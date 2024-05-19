import type { ViteDevServer, WebSocketServer } from 'vite'

export function useServerSocket(server: ViteDevServer): WebSocketServer | null {
  let socket = null;

  if (server?.ws) {
    socket = server?.ws;
  }

  return socket;
}
