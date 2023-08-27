export function useClientSocket() {
  let socket = null;

  if (import.meta.hot) {
    socket = import.meta.hot;
  }

  return socket;
}
