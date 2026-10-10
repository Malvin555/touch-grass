import { defineStore } from 'pinia'
import { NATURE_MISSIONS } from '@/constants/nature'

const MAX_ATTEMPTS = 2

export const useNatureStore = defineStore('nature', {
  state: () => ({
    status: 'idle',
    missionId: null,
    startedAt: null,
    photo: null,
    result: null,

    attempts: 0,

    incorrectAttempts: 0,
  }),

  getters: {
    mission: (state) => NATURE_MISSIONS.find((mission) => mission.id === state.missionId) ?? null,

    missionDuration: (state) => {
      const mission = NATURE_MISSIONS.find((mission) => mission.id === state.missionId)

      return mission ? mission.minutes * 60 : 0
    },

    maxAttempts: () => MAX_ATTEMPTS,

    remainingAttempts: (state) => Math.max(0, MAX_ATTEMPTS - state.incorrectAttempts),
  },

  actions: {
    chooseRandomMission() {
      const index = Math.floor(Math.random() * NATURE_MISSIONS.length)
      this.chooseMission(NATURE_MISSIONS[index].id)
    },

    chooseMission(missionId) {
      const mission = NATURE_MISSIONS.find((item) => item.id === missionId)

      if (!mission) {
        throw new Error(`Unknown nature mission: ${missionId}`)
      }

      this.missionId = missionId
      this.status = 'ready'
      this.startedAt = null
      this.photo = null
      this.result = null
      this.attempts = 0
      this.incorrectAttempts = 0
    },

    start() {
      if (!this.missionId) {
        throw new Error('No nature mission selected')
      }

      this.startedAt = Date.now()
      this.status = 'active'
    },

    setPhoto(photo) {
      if (this.status !== 'active') {
        throw new Error('The nature mission is not active')
      }

      if (!photo) {
        throw new Error('A photo is required')
      }

      if (this.incorrectAttempts >= MAX_ATTEMPTS) {
        throw new Error('No attempts remaining')
      }

      this.attempts += 1
      this.photo = photo
      this.result = null
      this.status = 'verifying'
    },

    rejectPhoto() {
      if (this.status !== 'verifying') {
        throw new Error('No photo is awaiting verification')
      }

      this.incorrectAttempts += 1
      this.photo = null
      this.result = null

      if (this.incorrectAttempts >= MAX_ATTEMPTS) {
        this.status = 'failed'
      } else {
        this.status = 'active'
      }
    },

    retryTechnicalError() {
      if (this.status !== 'verifying') {
        throw new Error('No photo is awaiting verification')
      }

      this.photo = null
      this.result = null
      this.status = 'active'
    },

    retryPhoto() {
      if (this.status !== 'verifying') {
        throw new Error('There is no photo awaiting verification')
      }

      this.photo = null
      this.result = null

      if (this.attempts >= MAX_ATTEMPTS) {
        this.status = 'failed'
      } else {
        this.status = 'active'
      }
    },

    complete(result) {
      if (this.status !== 'verifying') {
        throw new Error('The nature mission is not awaiting verification')
      }

      if (!result) {
        throw new Error('A verification result is required')
      }

      this.result = result
      this.status = 'completed'
    },

    fail() {
      this.photo = null
      this.result = null
      this.status = 'failed'
    },

    reset() {
      this.$reset()
    },
  },
})
