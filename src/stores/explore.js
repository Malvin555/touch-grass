import { defineStore } from 'pinia'
import { EXPLORE_PROMPTS } from '@/constants/explore'

export const useExploreStore = defineStore('explore', {
  state: () => ({
    status: 'idle',
    promptId: null,
    startedAt: null,
    completedAt: null,
    photo: null,
  }),

  getters: {
    prompt: (state) => EXPLORE_PROMPTS.find((prompt) => prompt.id === state.promptId) ?? null,

    isReady: (state) => state.status === 'ready',

    isRunning: (state) => state.status === 'active',

    isCompleted: (state) => state.status === 'completed',
  },

  actions: {
    chooseRandomPrompt() {
      const availablePrompts = EXPLORE_PROMPTS.filter((prompt) => prompt.id !== this.promptId)

      const prompts = availablePrompts.length ? availablePrompts : EXPLORE_PROMPTS

      const index = Math.floor(Math.random() * prompts.length)

      this.promptId = prompts[index].id
      this.startedAt = null
      this.completedAt = null
      this.photo = null
      this.status = 'ready'
    },

    start() {
      if (!this.promptId) {
        throw new Error('No Explore prompt selected')
      }

      this.startedAt = Date.now()
      this.completedAt = null
      this.photo = null
      this.status = 'active'
    },

    setPhoto(photo) {
      if (this.status !== 'active') return

      this.photo = photo
    },

    complete() {
      if (this.status !== 'active' || !this.photo) return

      this.completedAt = Date.now()
      this.status = 'completed'
    },

    reset() {
      this.$reset()
    },
  },
})
