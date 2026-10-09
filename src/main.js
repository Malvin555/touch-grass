import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import { useTheme } from './composables/useTheme'
import { createStatePersistence } from 'pinia-plugin-state-persistence'
import 'virtual:uno.css'
import '@/assets/css/main.css'

const pinia = createPinia()
pinia.use(createStatePersistence())
const app = createApp(App)

app.use(pinia)
app.use(router)
useTheme().init()
app.mount('#app')
