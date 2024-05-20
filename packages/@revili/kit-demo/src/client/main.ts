import {createApp, h} from 'vue'
import App from './App.vue'

const createVueApp = async () => {
  const app = createApp({
    setup() {
      return () => h(App)
    },
  })

  app.mount('#app')
}

createVueApp()
