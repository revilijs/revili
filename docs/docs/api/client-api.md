---
title: 客户端 API
---

## useClientSocket

- 类型：`{ on: (event: string, handler: (data: any) => void) => void; send: (event: string, data: any) => void; }`
- 描述：客户端与服务端的通信 API。
- 案例：

```ts
import { useClientSocket } from 'revili/client'

const socket = useClientSocket()

socket?.on('event-name', (data: any) => {
  // ...
})

socket?.send('event-name', 'message')
```
