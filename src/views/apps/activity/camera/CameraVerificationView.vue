<script setup>
import TgButton from '@/components/ui/TgButton.vue'
import TgVerificationResult from '@/components/ui/TgVerificationResult.vue'
import TgRewardCelebration from '@/components/ui/TgRewardCelebration.vue'
import TgPhoto from '@/components/ui/TgPhoto.vue'

import { useGo } from '@/composables/useGo'
import { useNatureStore } from '@/stores/nature'
import { useProgressStore } from '@/stores/progress'

const go = useGo()
const nature = useNatureStore()
const progress = useProgressStore()

const verifyMission = () => {
  const mission = nature.mission

  if (!mission) {
    go('home')
    return
  }

  nature.complete({
    result: mission.title,
    confidence: 94,
  })

  progress.completeNature(mission)

  go('journal')
}
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col justify-between pb-5 pt-3">
    <section class="flex flex-col gap-[18px]">
      <TgPhoto
        tone="leaf"
        :alt="nature.mission?.title ?? 'Your nature discovery'"
        class="h-[220px] w-full rounded-3xl"
      />

      <TgVerificationResult
        :result="nature.mission?.title ?? 'Nature discovery'"
        :confidence="94"
      />
    </section>

    <section class="flex flex-col items-center gap-3">
      <TgRewardCelebration :points="nature.mission?.points ?? 0" />

      <TgButton label="CONTINUE" @click="verifyMission" />
    </section>
  </div>
</template>
