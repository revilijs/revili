<template>
  <div class="works__container">
    <MagicCard
      class="works__item"
      v-for="(item, index) in data"
      :key="index"
      @click="() => jumpLink(item.link)"
    >
      <h4>{{ item.title }}</h4>
      <p>{{ item.desc }}</p>
    </MagicCard>
  </div>
</template>

<script setup lang="ts">
import { kitStore as zhKitStore } from '../config/zh'
import { kitStore as enKitStore } from '../config/en'
import { computed, toRefs } from 'vue';

const props = defineProps({
  lang: {
    type: String,
    default: 'zh'
  }
})

const { lang } = toRefs(props)
const data = computed(() => {
  return lang.value === 'zh' ? zhKitStore : enKitStore
})

const jumpLink = (link?: string) => {
  if (link) {
    window.open(link, '_blank')
  }
}
</script>

<style scoped>
@import '@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css';

.works__container {
  @apply grid grid-cols-1 gap-4 max-w-screen-lg mx-auto py-16 px-6;
  @apply md:grid-cols-3;
  .works__item {
    @apply py-4 px-6 cursor-pointer;
    h4 {
      @apply mt-0 mb-0 pt-0;
    }
    p {
      @apply my-4 text-lighter;
    }
  }
}
</style>
