<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TgShutterButton from '@/components/ui/TgShutterButton.vue'
import TgViewfinder from '@/components/ui/TgViewfinder.vue'
import TgPhoto from '@/components/ui/TgPhoto.vue'

import { useCamera } from '@/composables/useCamera'
import { useGo } from '@/composables/useGo'
import { useExploreStore } from '@/stores/explore'
import { useNatureStore } from '@/stores/nature'
import { compressImage } from '@/services/imageCompression'
import { useProgressStore } from '@/stores/progress'

const route = useRoute()
const go = useGo()

const progress = useProgressStore()
const nature = useNatureStore()
const explore = useExploreStore()

const {
  isNative,
  videoElement,
  viewfinderElement,
  photoUrl,
  isCapturing,
  cameraError,
  capturePhoto,
} = useCamera()

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

async function captureDiscovery() {
  await capturePhoto(async (photo) => {
    try {
      const compressedPhoto = await compressImage(photo)

      if (isNature.value) {
        nature.setPhoto(compressedPhoto)
        go('verify', { activity: 'nature' })
        return
      }

      if (isExplore.value) {
        explore.setPhoto(compressedPhoto)

        const saved = progress.saveExploreMoment(compressedPhoto, explore.prompt)

        if (!saved) return

        explore.complete()
        go('journal', {}, {}, { replace: true })
      }
    } catch (error) {
      console.error('Could not process discovery photo:', error)
    }
  })
}
</script>

<template>
  <div class="camera-page mx-auto flex min-h-0 w-full flex-1 flex-col">
    <TgViewfinder
      ref="viewfinderElement"
      instruction="Show us what you found"
      :hint="hint"
      class="camera-viewfinder min-h-0 flex-1"
    >
      <video
        v-if="!isNative && !photoUrl"
        ref="videoElement"
        autoplay
        playsinline
        muted
        class="size-full object-cover"
      />

      <TgPhoto
        v-else-if="photoUrl"
        :src="photoUrl"
        alt="Your captured discovery"
        tone="leaf"
        class="size-full"
      />
    </TgViewfinder>

    <p v-if="cameraError" role="alert" class="px-6 pt-3 text-center text-sm text-red-600">
      {{ cameraError }}
    </p>

    <section
      class="camera-controls flex shrink-0 flex-col items-center justify-center gap-3 px-6 pb-3.5 pt-[22px]"
    >
      <p class="text-center font-sans text-[12px] leading-normal text-subtle">
        Only your discovery. Saved privately.
      </p>

      <TgShutterButton @click="captureDiscovery" />

      <p class="font-sans text-[12px] font-extrabold text-ink">
        {{ isCapturing ? 'CAPTURING...' : 'CAPTURE DISCOVERY' }}
      </p>
    </section>
  </div>
</template>
