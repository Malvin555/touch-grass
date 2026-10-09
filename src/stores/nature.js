import { defineStore } from 'pinia'
import { NATURE_MISSIONS } from '@/constants/nature'

export const useNatureStore = defineStore('nature', {
  state: () => ({
    status: 'idle',
    missionId: null,
    startedAt: null,
    photo: null,
    result: null,
  }),

  getters: {
    mission: (state) => NATURE_MISSIONS.find((mission) => mission.id === state.missionId) ?? null,

    missionDuration: (state) => {
      const mission = NATURE_MISSIONS.find((mission) => mission.id === state.missionId)

      return mission ? mission.minutes * 60 : 0
    },
  },

  actions: {
    chooseRandomMission() {
      const index = Math.floor(Math.random() * NATURE_MISSIONS.length)

      this.missionId = NATURE_MISSIONS[index].id
      this.status = 'ready'
      this.startedAt = null
      this.photo = null
      this.result = null
    },

    chooseMission(missionId) {
      const mission = NATURE_MISSIONS.find((mission) => mission.id === missionId)

      if (!mission) {
        throw new Error(`Unknown nature mission: ${missionId}`)
      }

      this.missionId = missionId
      this.status = 'ready'
      this.startedAt = null
      this.photo = null
      this.result = null
    },

    start() {
      if (!this.missionId) {
        throw new Error('No nature mission selected')
      }

      this.startedAt = Date.now()
      this.status = 'active'
    },

    setPhoto(photo) {
      this.photo = photo
      this.status = 'verifying'
    },

    complete(result) {
      this.result = result
      this.status = 'completed'
    },

    reset() {
      this.$reset()
    },
  },
})
