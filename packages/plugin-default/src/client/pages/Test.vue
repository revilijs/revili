<template><div>code generator</div></template>
<script lang="ts" setup>
import { useClientSocket } from 'vicli-shared/client'

const socket = useClientSocket()

socket?.on('codegenerator:say', (data: any) => {
  console.log('client get: ', data)
})
</script>
