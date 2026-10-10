<script setup>
import { ref, onMounted } from 'vue'

import TgButton from '@/components/ui/TgButton.vue'
import TgVerificationResult from '@/components/ui/TgVerificationResult.vue'
import TgRewardCelebration from '@/components/ui/TgRewardCelebration.vue'
import TgPhoto from '@/components/ui/TgPhoto.vue'
import TgCheckingOverlay from '@/components/ui/TgCheckingOverlay.vue'

import { useGo } from '@/composables/useGo'
import { useNatureStore } from '@/stores/nature'
import { useProgressStore } from '@/stores/progress'
import { useSound } from '@/composables/useSound'
import { useNatureVerification } from '@/composables/useNatureVerification'

const go = useGo()
const nature = useNatureStore()
const progress = useProgressStore()
const { playSound } = useSound()

const displayPhoto = ref('')

const {
  isVerifying,
  verificationError,
  prediction,
  confidence,
  isValid,
  validationMessage,
  analyzePhoto,
} = useNatureVerification()

onMounted(async () => {
  const photo = nature.photo
  const mission = nature.mission

  if (!mission || !photo || nature.status !== 'verifying') {
    go('home')
    return
  }

  displayPhoto.value = photo

  const outcome = await analyzePhoto(photo, mission)

  if (!outcome.success || outcome.valid) return

  nature.rejectPhoto()

  if (nature.status === 'failed') {
    playSound('failure')

    validationMessage.value =
      'Two incorrect photos. This mission has ended. No points or journal entry were saved.'
  }
})

const retryPhoto = () => {
  if (verificationError.value) {
    if (nature.status === 'verifying') {
      nature.retryTechnicalError()
    }

    go('camera', { activity: 'nature' })
    return
  }

  if (nature.status === 'failed') {
    go('home', {}, {}, { replace: true })
    return
  }

  if (nature.status === 'active') {
    go('camera', { activity: 'nature' })
  }
}

const verifyMission = () => {
  // Never save or navigate to the journal for a failed mission.
  if (nature.status === 'failed' || nature.incorrectAttempts >= nature.maxAttempts) {
    return
  }

  const mission = nature.mission
  const photo = nature.photo

  if (
    !mission ||
    !photo ||
    nature.status !== 'verifying' ||
    !isValid.value ||
    isVerifying.value ||
    verificationError.value
  ) {
    return
  }

  const result = {
    result: prediction.value,
    confidence: confidence.value,
    description: `AI identified ${prediction.value.toLowerCase()} during your ${mission.title} mission.`,
  }

  const saved = progress.completeNature(mission, photo, result)

  if (!saved) {
    verificationError.value = 'Could not save your discovery. Please try again.'
    return
  }

  nature.complete(result)
  go('journal')
}
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col justify-between gap-5 pb-5 pt-3">
    <section class="flex flex-col gap-[18px]">
      <TgCheckingOverlay
        v-if="isVerifying"
        :src="displayPhoto"
        message="Analyzing your discovery..."
      />

      <TgPhoto
        v-else
        :src="displayPhoto"
        tone="leaf"
        :alt="nature.mission?.title ?? 'Your nature discovery'"
        class="h-[220px] w-full rounded-3xl"
      />

      <div
        v-if="isVerifying"
        class="flex flex-col items-center gap-3 py-6 text-center"
        role="status"
        aria-live="polite"
      >
        <p class="font-display text-lg font-extrabold text-ink">Analyzing your discovery...</p>
        <p class="text-sm text-subtle">AI is examining your photo. This may take a moment.</p>
      </div>

      <div v-else-if="verificationError" class="flex flex-col gap-3 rounded-2xl p-4" role="alert">
        <p class="font-bold text-ink">AI verification error</p>
        <p class="text-sm text-subtle">{{ verificationError }}</p>
      </div>

      <template v-else>
        <TgVerificationResult :result="prediction" :confidence="confidence" />

        <div v-if="!isValid" class="flex flex-col gap-2 rounded-2xl p-4" role="alert">
          <p class="font-bold text-ink">
            {{ nature.status === 'failed' ? 'Mission ended' : 'Photo does not match' }}
          </p>
          <p class="text-sm text-subtle">{{ validationMessage }}</p>
          <p class="text-xs text-subtle">
            AI label matching checks relevance; it cannot prove the number of distinct shapes.
          </p>
        </div>
      </template>
    </section>

    <section class="flex flex-col items-center gap-3">
      <TgRewardCelebration
        v-if="!isVerifying && !verificationError && isValid"
        :points="nature.mission?.points ?? 0"
      />

      <TgButton v-if="isVerifying" label="ANALYZING..." :disabled="true" />

      <TgButton v-else-if="verificationError" label="TRY AGAIN" @click="retryPhoto" />

      <TgButton
        v-else-if="!isValid && nature.status === 'active'"
        label="TRY ANOTHER PHOTO"
        @click="retryPhoto"
      />

      <TgButton
        v-else-if="!isValid && nature.status === 'failed'"
        label="BACK HOME"
        @click="retryPhoto"
      />

      <TgButton v-else-if="isValid" label="CONTINUE" @click="verifyMission" />
    </section>
  </div>
</template>
