/** @format */

import {createApp, h} from 'vue'
import App from './App.vue'
import {createVueRouter} from './router/index.js'

// 引入样式
import naive from 'naive-ui'

const createVueApp = async () => {
  const app = createApp({
    setup() {
      return () => h(App)
    },
  })

  const router = await createVueRouter()

  app.use(router)
  app.use(naive)
  app.mount('#app')
}

createVueApp()
