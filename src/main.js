import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApp from '@/App.vue'
import { App as CapacitorApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import router from '@/router'
import { useTheme } from './composables/useTheme'
import { createStatePersistence } from 'pinia-plugin-state-persistence'
import 'virtual:uno.css'
import '@/assets/css/main.css'

const pinia = createPinia()
pinia.use(createStatePersistence())

const app = createApp(VueApp)

app.use(pinia)
app.use(router)

useTheme().init()

app.mount('#app')

if (Capacitor.isNativePlatform()) {
  let lastBackPress = 0

  CapacitorApp.addListener('backButton', () => {
    const currentRoute = router.currentRoute.value
    const isHome = currentRoute.name === 'home'
    if (!isHome && router.options.history.state.back) {
      router.back()
      return
    }

    if (isHome) {
      const now = Date.now()

      if (now - lastBackPress < 2000) {
        CapacitorApp.exitApp()
      } else {
        lastBackPress = now
        console.log('Press back again to exit')
      }
    } else {
      router.replace({ name: 'home' })
    }
  })
}
