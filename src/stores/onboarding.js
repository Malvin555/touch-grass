import { defineStore } from 'pinia'

const STORAGE_KEY = 'touchgrass:onboarding-completed'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    completed: localStorage.getItem(STORAGE_KEY) === 'true',
  }),

  actions: {
    finish() {
      this.completed = true
      localStorage.setItem(STORAGE_KEY, 'true')
    },

    reset() {
      this.completed = false
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
