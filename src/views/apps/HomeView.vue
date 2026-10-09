<script setup>
import { computed, onMounted, ref } from 'vue'
import TgCategoryCard from '@/components/ui/TgCategoryCard.vue'
import TgFieldJournalIllustration from '@/components/svg/TgFieldJournalIllustration.vue'
import TgWeatherChip from '@/components/ui/TgWeatherChip.vue'
import TgIconButton from '@/components/ui/TgIconButton.vue'
import { ICONS } from '@/constants/icons'
import appConfig from '@/config/app.json'
import { useGo } from '@/composables/useGo'

const go = useGo()

const DAILY_CHALLENGES = [
  { condition: 'green', text: 'Find three greens' },
  { condition: 'listen', text: 'Listen closely' },
  { condition: 'tiny', text: 'Spot a tiny thing' },
  { condition: 'clouds', text: 'Look at clouds' },
  { condition: 'challenge', text: 'Explore nearby' },
]

const dailyChallenge = ref(DAILY_CHALLENGES[0])

const dailyChallengeCondition = computed(() => dailyChallenge.value.condition)

function getDailyChallenge() {
  const today = new Date()
  const dayNumber = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000,
  )

  return DAILY_CHALLENGES[dayNumber % DAILY_CHALLENGES.length]
}

onMounted(() => {
  dailyChallenge.value = getDailyChallenge()
})
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col gap-6 pb-6 pt-[18px]">
    <section class="flex flex-col gap-2.5">
      <h1 class="tg-heading text-[40px]">
        {{ appConfig.site.title }}
      </h1>

      <p class="font-sans text-[17px] leading-normal text-ink">Go outside. Come back with proof.</p>

      <TgFieldJournalIllustration />
    </section>

    <div class="min-h-px flex-1" aria-hidden="true" />

    <section class="flex flex-col gap-4">
      <h2 class="tg-heading text-[25px]">What do you want to do?</h2>

      <div class="flex gap-3">
        <TgCategoryCard
          :icon="ICONS.walk"
          title="Walk"
          hint="Find your own pace"
          @click="go('time')"
        />

        <TgCategoryCard
          :icon="ICONS.leaf"
          title="Nature"
          hint="Notice the little things"
          @click="go('mission', { activity: 'nature' })"
        />
      </div>

      <div class="flex">
        <TgCategoryCard
          :icon="ICONS.search"
          title="Explore"
          hint="Take a curious turn"
          @click="go('mission', { activity: 'explore' })"
        />
      </div>
    </section>

    <section class="flex items-center gap-3">
      <TgWeatherChip :condition="dailyChallengeCondition" />

      <TgIconButton :icon="ICONS.camera" label="Your moments" @click="go('moments')" />
    </section>
  </div>
</template>
