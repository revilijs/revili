export function useServerSocket(server: any) {
  let socket = null;

  if (server?.ws) {
    socket = server?.ws;
  }

  return socket;
}
