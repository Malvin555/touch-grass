import { defineStore } from 'pinia'
import { WALK_OPTIONS } from '@/constants/walk'

export const useWalkStore = defineStore('walk', {
  state: () => ({
    status: 'idle',
    selectedBudget: null,
    missionDuration: 0,
    startedAt: null,
    completedAt: null,
  }),

  getters: {
    isRunning: (state) => state.status === 'running',

    isCompleted: (state) => state.status === 'completed',

    missionDurationMinutes: (state) => Math.floor(state.missionDuration / 60),
  },

  actions: {
    selectBudget(label) {
      const option = WALK_OPTIONS[label]

      if (!option) {
        throw new Error(`Unknown walk option: ${label}`)
      }

      this.selectedBudget = label
      this.missionDuration = option.duration
      this.status = 'ready'
      this.startedAt = null
      this.completedAt = null
    },

    start() {
      if (!this.selectedBudget) {
        throw new Error('No walk duration selected')
      }

      this.startedAt = Date.now()
      this.completedAt = null
      this.status = 'running'
    },

    complete() {
      if (this.status !== 'running') {
        return
      }

      this.completedAt = Date.now()
      this.status = 'completed'
    },

    reset() {
      this.$reset()
    },
  },
})
