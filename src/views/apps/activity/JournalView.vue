<script setup>
import { computed, watch } from 'vue'

import TgButton from '@/components/ui/TgButton.vue'
import TgGalleryMemory from '@/components/ui/TgGalleryMemory.vue'
import TgPointsCounter from '@/components/ui/TgPointsCounter.vue'
import TgSectionHeading from '@/components/ui/TgSectionHeading.vue'
import TgStreakCard from '@/components/ui/TgStreakCard.vue'

import { useSound } from '@/composables/useSound'
import { useGo } from '@/composables/useGo'
import { useProgressStore } from '@/stores/progress'
import { useNatureStore } from '@/stores/nature'
import { formatMemoryDate } from '@/utils/dateFormatter'

const go = useGo()
const progress = useProgressStore()
const nature = useNatureStore()
const { playSound } = useSound()

const missionFailed = computed(() => nature.status === 'failed')
const memories = computed(() => progress.memories ?? [])

const memoryCount = computed(() => memories.value.length)
let previousMemoryCount = memoryCount.value

watch(memoryCount, (count) => {
  if (count > previousMemoryCount) {
    playSound('success')
  }

  previousMemoryCount = count
})

watch(
  () => nature.status,
  (status, previousStatus) => {
    if (status === 'failed' && previousStatus !== 'failed') {
      playSound('failure')
    }
  },
)

const days = computed(() => {
  const today = new Date()

  return Array.from({ length: 3 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index - 1)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const key = `${year}-${month}-${day}`

    return {
      letter: date.toLocaleDateString('en', { weekday: 'narrow' }),
      date: key,
      active: (progress.completedDays ?? []).includes(key),
    }
  })
})
</script>

<template>
  <div class="mx-auto flex min-h-0 w-full flex-1 flex-col justify-between gap-6 pb-5 pt-[18px]">
    <section class="flex flex-col gap-5">
      <header class="flex flex-col gap-1.5">
        <h1 class="tg-heading text-[33px]">
          {{ missionFailed ? 'Every little try counts.' : 'A little more outside.' }}
        </h1>

        <p class="font-sans text-[14px] leading-normal text-subtle">
          {{
            missionFailed
              ? 'That mission did not work out this time. You can try another adventure whenever you are ready.'
              : 'Small adventures. Yours to keep.'
          }}
        </p>
      </header>

      <TgPointsCounter :points="progress.points" :earned="20" />

      <TgStreakCard
        :streak="progress.streak"
        :days="days"
        message="Miss a day? Nature will still be here."
      />
    </section>

    <section class="flex flex-col gap-3">
      <TgSectionHeading title="Little discoveries" action-label="Only you" @click="go('moments')" />

      <div v-if="memories.length" class="grid grid-cols-3 gap-[9px]">
        <TgGalleryMemory
          v-for="m in memories.slice(0, 3)"
          :key="m.id"
          v-bind="m"
          :date="formatMemoryDate(m.createdAt)"
          class="min-w-0"
        />
      </div>

      <p v-else class="rounded-2xl bg-surface p-4 text-sm text-subtle">
        {{
          missionFailed
            ? 'No discovery was saved for that mission. Your previous memories are safe.'
            : 'Your discoveries will appear here after you complete an adventure.'
        }}
      </p>
    </section>

    <TgButton label="FIND ANOTHER ADVENTURE" @click="go('home')" />
  </div>
</template>
