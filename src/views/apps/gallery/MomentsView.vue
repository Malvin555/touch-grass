<script setup>
import { computed, ref } from 'vue'

import TgButton from '@/components/ui/TgButton.vue'
import TgIconText from '@/components/ui/TgIconText.vue'
import TgPageIntro from '@/components/ui/TgPageIntro.vue'
import TgPolaroid from '@/components/ui/TgPolaroid.vue'
import TgPrivacyNote from '@/components/ui/TgPrivacyNote.vue'
import { formatMemoryDate } from '@/utils/dateFormatter'

import { useGo } from '@/composables/useGo'
import { useProgressStore } from '@/stores/progress'
import { ICONS } from '@/constants/icons'

const go = useGo()
const progress = useProgressStore()
const gallery = ref(null)
const showTopFade = ref(false)

const handleGalleryScroll = () => {
  showTopFade.value = gallery.value.scrollTop > 0
}

const memories = computed(() => progress.memories)
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col overflow-hidden pb-5 pt-[18px]">
    <TgPageIntro
      eyebrow="Your private field journal"
      title="Your moments"
      subtitle="Small adventures. Yours to keep."
    />

    <section class="flex min-h-0 flex-1 flex-col gap-3 pt-2">
      <div class="flex shrink-0 items-center justify-between">
        <TgIconText
          :icon="ICONS.camera"
          :icon-size="20"
          :size="13"
          weight="extrabold"
          tone="ink"
          class="gap-1.5"
        >
          {{ memories.length }} little discoveries
        </TgIconText>

        <p class="font-sans text-[12px] text-subtle">Tap a photo to revisit</p>
      </div>

      <div class="relative min-h-0 w-full flex-1">
        <div
          ref="gallery"
          @scroll="handleGalleryScroll"
          class="grid h-full min-h-0 w-full grid-cols-2 content-start items-start gap-3 overflow-y-auto pb-6"
        >
          <p
            v-if="memories.length === 0"
            class="col-span-2 py-8 text-center font-sans text-sm text-subtle"
          >
            No moments yet. Head outside and capture your first discovery.
          </p>

          <TgPolaroid
            v-for="(memory, index) in memories"
            :key="`${memory.title}-${index}`"
            :featured="index % 3 === 0"
            :title="memory.title"
            :date="formatMemoryDate(memory.createdAt)"
            :tone="memory.tone"
            :src="memory.photo"
            :class="['w-full', index % 3 === 0 ? 'col-span-2' : 'col-span-1']"
            @open="go('moment', {}, { id: memory.id })"
          />
        </div>
        <Transition name="fade">
          <div
            v-if="showTopFade"
            class="pointer-events-none absolute inset-x-0 top-0 z-10 h-12"
            style="
              background: linear-gradient(
                to bottom,
                var(--tg-canvas) 0%,
                color-mix(in srgb, var(--tg-canvas) 70%, transparent) 35%,
                transparent 100%
              );
            "
          />
        </Transition>

        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
          style="
            background: linear-gradient(
              to top,
              var(--tg-canvas) 0%,
              color-mix(in srgb, var(--tg-canvas) 85%, transparent) 25%,
              color-mix(in srgb, var(--tg-canvas) 45%, transparent) 55%,
              color-mix(in srgb, var(--tg-canvas) 15%, transparent) 80%,
              transparent 100%
            );
          "
        />
      </div>
    </section>

    <section class="mt-3 flex shrink-0 flex-col gap-3">
      <TgButton label="BACK TO HOME" @click="go('home')" />
      <TgPrivacyNote />
    </section>
  </div>
</template>
