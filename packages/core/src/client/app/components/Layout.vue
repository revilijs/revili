<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
// @ts-ignore
import { appConfig } from 'virtual:custom-routes'
import { LayoutOption } from 'revili-shared/common'

const router = useRouter()

console.log(111, appConfig.layoutOptions)

const layoutOptionsMap = appConfig.layoutOptions.reduce(
  (prev: Record<string, any>, opt: LayoutOption) => {
    prev[opt.route] = {
      icon: opt.icon,
      label: opt.title,
      href: opt.route,
      children: opt.children
    }
    return prev
  },
  {},
)

const activeName = ref(appConfig.layoutOptions[0].route)
const sidebarData = computed(() => {
  return layoutOptionsMap[activeName.value].children
})
    console.log(sidebarData.value)

const activeKey = ref(sidebarData.value[0].route)

const handleItemClick = ({ key }: any) => {
  activeKey.value = key
}
const handleExpandChange = () => {}
const handleMenuClick = () => {
  activeKey.value = sidebarData.value[0].route
  router.push(sidebarData.value[0].route)
}

const handleUpdateValue = (key: string, item: MenuOption) => {
  router.push(item.href)
}
</script>

<template>
  <div class="app__container">
    <n-layout-header class="app__header">
      <div class="app__name">
        工作台
      </div>
      <ul class="app__nav-menus">
        <li v-for="item in appConfig.layoutOptions">
          <a :href="item.route">{{ item.title }}</a>
        </li>
      </ul>
    </n-layout-header>
    <n-layout class="app-body" has-sider>
      <n-layout-sider class="app__sidebar" content-style="padding: 24px;">
        <n-menu
          :inverted="true"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="sidebarData"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout-content class="app__content" content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
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
