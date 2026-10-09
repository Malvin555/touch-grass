import { defineStore } from 'pinia'
import { WALK_OPTIONS } from '@/constants/walk'

function getLocalDateKey(timestamp = Date.now()) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const useProgressStore = defineStore('progress', {
  state: () => ({
    points: 0,
    streak: 0,
    completedDays: [],

    completed: {
      walk: 0,
      nature: 0,
      explore: 0,
    },

    memories: [],
  }),

  actions: {
    recordActivityDay() {
      this.completedDays ??= []

      const today = getLocalDateKey()

      if (!this.completedDays.includes(today)) {
        this.completedDays.push(today)
      }

      this.calculateStreak()
    },

    calculateStreak() {
      const dates = new Set(this.completedDays ?? [])
      const checkDate = new Date()
      checkDate.setHours(0, 0, 0, 0)

      const keyFor = (date) => getLocalDateKey(date.getTime())

      let streak = 0

      if (!dates.has(keyFor(checkDate))) {
        checkDate.setDate(checkDate.getDate() - 1)
      }

      while (dates.has(keyFor(checkDate))) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      }

      this.streak = streak
    },

    completeWalk(option = '30 min') {
      const walkOption = WALK_OPTIONS[option]
      if (!walkOption) return false

      const title = `A ${option} walk`
      const createdAt = Date.now()
      const points = walkOption.points

      this.points += points
      this.completed.walk += 1
      this.recordActivityDay()

      this.memories.unshift({
        id: crypto.randomUUID(),
        activityKey: `walk:${option}`,
        title,
        createdAt,
        tone: 'walk',
        points,
      })

      return true
    },

    completeNature(mission) {
      if (!mission) return false

      const title = mission.title ?? mission.id
      if (!title) return false

      const createdAt = Date.now()
      const points = Number(mission.points ?? 0)

      this.points += points
      this.completed.nature += 1
      this.recordActivityDay()

      this.memories.unshift({
        id: crypto.randomUUID(),
        activityKey: `nature:${mission.id ?? mission.title}`,
        title,
        createdAt,
        tone: 'nature',
        points,
      })

      return true
    },

    saveExploreMoment(photo, prompt) {
      if (!prompt) return false

      const title = prompt.title ?? prompt.name ?? prompt.id ?? 'Explore discovery'
      const createdAt = Date.now()
      const points = Number(prompt.points ?? 0)

      this.points += points
      this.completed.explore += 1
      this.recordActivityDay()

      this.memories.unshift({
        id: crypto.randomUUID(),
        activityKey: `explore:${prompt.id ?? prompt.title ?? prompt.name ?? 'discovery'}`,
        title,
        createdAt,
        tone: 'nature',
        photo,
        points,
      })

      return true
    },
  },

  persist: true,
})
