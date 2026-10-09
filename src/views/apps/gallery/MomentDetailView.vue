<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TgButton from '@/components/ui/TgButton.vue'
import TgPageIntro from '@/components/ui/TgPageIntro.vue'
import TgPhotoFrame from '@/components/ui/TgPhotoFrame.vue'
import TgPrivacyNote from '@/components/ui/TgPrivacyNote.vue'

import { useGo } from '@/composables/useGo'
import { useProgressStore } from '@/stores/progress'
import { formatMemoryDate } from '@/utils/dateFormatter'

const route = useRoute()
const go = useGo()
const progress = useProgressStore()

const memory = computed(() => {
  const id = route.params.id

  if (!id) return null

  return progress.memories.find((item) => item.id === id) ?? null
})

const memoryDate = computed(() => (memory.value ? formatMemoryDate(memory.value.createdAt) : ''))
</script>

<template>
  <div
    class="mx-auto flex min-h-0 w-full flex-1 flex-col justify-between gap-6 pb-5 pt-[18px] lg:gap-8"
  >
    <TgPageIntro
      eyebrow="A little discovery"
      :title="memory?.title ?? 'Memory not found'"
      :subtitle="memoryDate"
    />

    <div class="mx-auto w-full">
      <TgPhotoFrame
        :caption="memory ? `Your photo · ${memory.title}` : 'No photo available'"
        :tone="memory?.tone ?? 'leaf'"
        :src="memory?.photo"
      />
    </div>

    <section class="flex flex-col gap-[5px]">
      <h2 class="font-display text-[22px] font-extrabold text-ink">A little more outside.</h2>
      <p class="font-sans text-[14px] leading-normal text-subtle">
        A small adventure to look back on.
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <TgButton label="BACK TO YOUR MOMENTS" @click="go('moments')" />
      <TgPrivacyNote />
    </section>
  </div>
</template>
