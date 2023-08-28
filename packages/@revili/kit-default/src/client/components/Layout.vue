<script lang="ts" setup>
</script>

<template>
  <div class="app__container">
    <div class="app__header">
      <div class="app__name">
        工作台
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.app__container {
  @apply flex w-screen h-screen flex-col;
  .app__header {
    @apply flex justify-between items-center px-8 bg-gray-800 text-white;
    height: 60px;
    .app__name {
      @apply text-3xl;
    }
    .app__nav-menus {
      @apply flex list-none;
      li a {
        @apply text-white;
      }
      li:not(:last-child) {
        @apply mr-4;
      }
    }
  }
  .app__body {
    flex: 0 0 1;
  }
  .app__sidebar {
    @apply bg-gray-200;
  }
}
</style>
