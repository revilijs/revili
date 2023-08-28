import {createApp, h} from 'vue'
import App from './App.vue'
import {createVueRouter} from './router/index.js'

const createVueApp = async () => {
  const app = createApp({
    setup() {
      return () => h(App)
    },
  })

  const router = await createVueRouter()

  app.use(router)
  app.mount('#app')
}

createVueApp()
