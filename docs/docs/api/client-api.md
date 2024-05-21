---
title: Client API
---

## useClientSocket

- Type: `{ on: (event: string, handler: (data: any) => void) => void; send: (event: string, data: any) => void; }`
- Description: The client communicates with the server.
- Example:

```ts
import { useClientSocket } from 'revili/client'

const socket = useClientSocket()

socket?.on('event-name', (data: any) => {
  // ...
})

socket?.send('event-name', 'message')
```
