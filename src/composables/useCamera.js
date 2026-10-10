import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { Capacitor } from '@capacitor/core'
import { startNativeCamera, stopNativeCamera, takePhoto } from '@/services/camera'

export function useCamera() {
  const isNative = Capacitor.isNativePlatform()

  const videoElement = ref(null)
  const viewfinderElement = ref(null)
  const photoUrl = ref('')
  const isCapturing = ref(false)
  const cameraError = ref('')

  let cameraStream = null
  let nativeCameraStarted = false

  async function startCamera() {
    cameraError.value = ''

    try {
      if (isNative) {
        await nextTick()

        const element = viewfinderElement.value?.$el ?? viewfinderElement.value

        if (!element) {
          throw new Error('Viewfinder element is not ready')
        }

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

  async function capturePhoto(onCaptured) {
    if (isCapturing.value) return

    isCapturing.value = true
    cameraError.value = ''

    try {
      const photo = await takePhoto(isNative ? null : videoElement.value)

      photoUrl.value = photo.webPath

      await stopCamera()
      await onCaptured(photo.webPath)
    } catch (error) {
      console.error('Photo capture failed:', error)

      cameraError.value = 'Could not capture or save your photo. Please try again.'
    } finally {
      isCapturing.value = false
    }
  }

  onMounted(startCamera)
  onBeforeUnmount(stopCamera)

  return {
    isNative,
    videoElement,
    viewfinderElement,
    photoUrl,
    isCapturing,
    cameraError,
    capturePhoto,
  }
}
