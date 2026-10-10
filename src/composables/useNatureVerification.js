import { ref } from 'vue'
import { classifyImage } from '@/services/localVision'
import { validateMission } from '@/services/natureMissionValidation'

export function useNatureVerification() {
  const isVerifying = ref(false)
  const verificationError = ref('')
  const prediction = ref('')
  const confidence = ref(0)
  const isValid = ref(false)
  const validationMessage = ref('')

  async function analyzePhoto(photo, mission) {
    isVerifying.value = true
    verificationError.value = ''
    prediction.value = ''
    confidence.value = 0
    isValid.value = false
    validationMessage.value = ''

    try {
      const result = await classifyImage(photo)

      prediction.value = result.label
      confidence.value = Math.round(result.confidence * 100)

      const labels = result.labels?.length
        ? result.labels
        : [{ text: result.label, confidence: result.confidence }]

      const validation = validateMission(mission.id, labels)

      isValid.value = validation.valid
      validationMessage.value = validation.message

      return {
        success: true,
        valid: validation.valid,
        validation,
      }
    } catch (error) {
      console.error('AI verification failed:', error)

      verificationError.value =
        error instanceof Error ? error.message : 'Could not analyze your photo. Please try again.'

      return {
        success: false,
        valid: false,
      }
    } finally {
      isVerifying.value = false
    }
  }

  return {
    isVerifying,
    verificationError,
    prediction,
    confidence,
    isValid,
    validationMessage,
    analyzePhoto,
  }
}
