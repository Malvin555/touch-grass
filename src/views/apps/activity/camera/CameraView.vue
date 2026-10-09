<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Capacitor } from '@capacitor/core'
import { startNativeCamera, stopNativeCamera, takePhoto } from '@/services/camera'

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

const photoUrl = ref('')
const isCapturing = ref(false)
const cameraError = ref('')

const isNature = computed(() => route.query.activity === 'nature')
const isExplore = computed(() => route.query.activity === 'explore')

const isNative = Capacitor.isNativePlatform()
const videoElement = ref(null)
const viewfinderElement = ref(null)

let cameraStream = null
let nativeCameraStarted = false

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

async function startCamera() {
  cameraError.value = ''

  try {
    if (isNative) {
      await nextTick()

      const element = viewfinderElement.value?.$el ?? viewfinderElement.value

      if (!element) {
        throw new Error('Viewfinder element is not ready')
      }

      // Let the native camera show through the WebView.
      document.documentElement.classList.add('camera-preview-active')

      const rect = element.getBoundingClientRect()

      await startNativeCamera({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      })

      nativeCameraStarted = true
      return
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Camera access is not supported in this browser')
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    })

    if (videoElement.value) {
      videoElement.value.srcObject = cameraStream
      await videoElement.value.play()
    }
  } catch (error) {
    console.error('Could not start camera:', error)

    if (isNative && !nativeCameraStarted) {
      document.documentElement.classList.remove('camera-preview-active')
    }

    cameraError.value =
      error.name === 'NotAllowedError'
        ? 'Camera permission denied. Allow camera access in settings.'
        : 'Could not start camera. Check permissions and try again.'
  }
}

async function stopCamera() {
  try {
    if (nativeCameraStarted) {
      await stopNativeCamera()
    }
  } catch (error) {
    console.error('Could not stop native camera:', error)
  } finally {
    nativeCameraStarted = false

    document.documentElement.classList.remove('camera-preview-active')
  }

  cameraStream?.getTracks().forEach((track) => track.stop())
  cameraStream = null
}

onMounted(startCamera)
onBeforeUnmount(stopCamera)

async function capturePhoto() {
  if (isCapturing.value) return

  isCapturing.value = true
  cameraError.value = ''

  try {
    const photo = await takePhoto(isNative ? null : videoElement.value)

    photoUrl.value = photo.webPath

    await stopCamera()

    if (isNature.value) {
      nature.setPhoto(photo.webPath)
      go('verify', { activity: 'nature' })
      return
    }

    if (isExplore.value) {
      explore.setPhoto(photo.webPath)

      const saved = progress.saveExploreMoment(photo.webPath, explore.prompt)

      if (!saved) return

      explore.complete()
      go('journal', {}, {}, { replace: true })
    }
  } catch (error) {
    console.error('Photo capture failed:', error)
    cameraError.value = 'Could not capture photo. Please try again.'
  } finally {
    isCapturing.value = false
  }
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

      <TgShutterButton @click="capturePhoto" />

      <p class="font-sans text-[12px] font-extrabold text-ink">
        {{ isCapturing ? 'CAPTURING...' : 'CAPTURE DISCOVERY' }}
      </p>
    </section>
  </div>
</template>
