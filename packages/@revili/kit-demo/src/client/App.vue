<template>
  <div class="logo">
    <img src="./assets/revili.svg" width="40" height="40" alt="">
  </div>
  <div class="content">
    <button @click="getCurrnetPath">get user path</button>
    <div>user path: {{ msgFromServer }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClientSocket } from 'revili/client'

import { USER_PATH } from '../constants/index.js'

const socket = useClientSocket()
const msgFromServer = ref('click button to get')

socket?.on('server:message', (data: any) => {
  msgFromServer.value = data
})

const getCurrnetPath = () => {
  socket?.send('client:message', USER_PATH)
}
</script>

<style lang="postcss">
.logo {
  margin: 50px auto 0;
  width: 160px;
  height: 160px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}

.content {
  margin: 50px auto 0;
  width: 80%;
  @apply text-center;
  button {
    background-color: #5D67E8;
    @apply rounded text-white border mb-4 py-2 px-4 cursor-pointer;
  }
}
</style>
