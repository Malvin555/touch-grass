<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useGo } from '@/composables/useGo'
import { useMissionTimer } from '@/composables/useMissionTimer'

import { useWalkStore } from '@/stores/walk'
import { useProgressStore } from '@/stores/progress'
import { useNatureStore } from '@/stores/nature'
import { useExploreStore } from '@/stores/explore'

import TgButton from '@/components/ui/TgButton.vue'
import TgTerrainContours from '@/components/svg/TgTerrainContours.vue'
import { ICONS } from '@/constants/icons'

const route = useRoute()
const go = useGo()

const walk = useWalkStore()
const nature = useNatureStore()
const explore = useExploreStore()
const progress = useProgressStore()

const activity = computed(() => route.query.activity)

const isWalk = computed(() => activity.value === 'walk')
const isNature = computed(() => activity.value === 'nature')
const isExplore = computed(() => activity.value === 'explore')

const completeWalk = () => {
  walk.complete()
  progress.completeWalk(walk.selectedBudget)
  go('journal')
}

const handleTimeout = () => {
  if (isWalk.value) {
    completeWalk()
  } else if (isNature.value) {
    nature.expire()
  } else if (isExplore.value) {
    go('camera', { activity: 'explore' })
  }
}

const timerDuration = isWalk.value
  ? walk.missionDuration
  : isNature.value
    ? nature.missionDuration
    : isExplore.value
      ? (explore.prompt?.minutes ?? 0) * 60
      : 0

const timerStartedAt = isWalk.value
  ? walk.startedAt
  : isNature.value
    ? nature.startedAt
    : isExplore.value
      ? explore.startedAt
      : null

const { elapsedTime, totalTime, start } = useMissionTimer(
  timerDuration,
  timerStartedAt,
  handleTimeout,
)

if (isWalk.value || isNature.value || isExplore.value) {
  start()
}
</script>

<template>
  <div
    class="relative isolate flex min-h-0 flex-1 flex-col justify-between overflow-hidden pb-[22px] pt-[82px]"
  >
    <div
      class="pointer-events-none absolute inset-x-0 bottom-20 z-0 h-[42%] min-h-[180px]"
      aria-hidden="true"
    >
      <TgTerrainContours />
    </div>

    <section class="relative z-10 flex flex-col items-center gap-[18px]">
      <h1 class="flex h-10 items-center justify-center gap-1">
        <span class="font-display text-[35px] font-extrabold leading-[1.15] text-ink">
          GO OUTSIDE
        </span>
      </h1>

      <p class="text-center font-sans text-[17px] leading-normal text-subtle">
        Pocket your phone. The world can take it from here.
      </p>

      <template v-if="isWalk || isNature || isExplore">
        <p class="text-center font-sans text-[14px] text-subtle tabular-nums">
          {{ elapsedTime }} / {{ totalTime }}
        </p>

        <p class="font-sans text-[11px] text-subtle">TIME OUTSIDE</p>
      </template>
    </section>

    <section class="relative z-10 flex flex-col gap-5">
      <template v-if="isWalk">
        <p class="text-center font-sans text-[13px] leading-normal text-subtle">
          Keep walking. Notice something you usually miss.
        </p>
      </template>

      <template v-else-if="isNature">
        <p class="text-center font-sans text-[13px] leading-normal text-subtle">
          {{ nature.mission?.task }}
        </p>

        <TgButton
          label="VERIFY MISSION"
          :icon="ICONS.camera"
          @click="go('camera', { activity: 'nature' })"
        />
      </template>

      <template v-else-if="isExplore">
        <p class="text-center font-sans text-[13px] leading-normal text-subtle">
          {{ explore.prompt?.task }}
        </p>

        <TgButton
          label="CAPTURE MOMENT"
          :icon="ICONS.camera"
          @click="go('camera', { activity: 'explore' })"
        />
      </template>
    </section>
  </div>
</template>
