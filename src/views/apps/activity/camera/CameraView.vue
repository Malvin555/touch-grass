<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TgShutterButton from '@/components/ui/TgShutterButton.vue'
import TgViewfinder from '@/components/ui/TgViewfinder.vue'
import TgPhoto from '@/components/ui/TgPhoto.vue'

import { useExploreStore } from '@/stores/explore'
import { useNatureStore } from '@/stores/nature'
import { useProgressStore } from '@/stores/progress'
import { useGo } from '@/composables/useGo'

const route = useRoute()
const go = useGo()

const progress = useProgressStore()
const nature = useNatureStore()
const explore = useExploreStore()

const isNature = computed(() => route.query.activity === 'nature')
const isExplore = computed(() => route.query.activity === 'explore')

const hint = computed(() => {
  if (isNature.value) {
    return nature.mission?.task ?? 'Look closely at your nature discovery'
  }

  if (isExplore.value) {
    return (
      explore.prompt?.task ??
      explore.prompt?.description ??
      explore.prompt?.title ??
      'Capture something interesting around you'
    )
  }

  return 'Look around and find something interesting'
})

const capturePhoto = () => {
  if (isNature.value) {
    nature.setPhoto('captured-photo')

    go('verify', { activity: 'nature' })

    return
  }

  if (isExplore.value) {
    explore.setPhoto('captured-photo')

    const saved = progress.saveExploreMoment('captured-photo', explore.prompt)

    if (!saved) return

    explore.complete()

    go('journal', {}, {}, { replace: true })
  }
}
</script>

<template>
  <div class="mx-auto flex min-h-0 w-full flex-1 flex-col">
    <TgViewfinder instruction="Show us what you found" :hint="hint" class="min-h-0 flex-1">
      <!-- Replace with the live camera preview later -->
      <TgPhoto tone="leaf" class="size-full" />
    </TgViewfinder>

    <section class="flex shrink-0 flex-col items-center justify-center gap-3 px-6 pb-3.5 pt-[22px]">
      <p class="text-center font-sans text-[12px] leading-normal text-subtle">
        Only your discovery. Saved privately.
      </p>

      <TgShutterButton @click="capturePhoto" />

      <p class="font-sans text-[12px] font-extrabold text-ink">CAPTURE DISCOVERY</p>
    </section>
  </div>
</template>
