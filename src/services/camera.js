import { CameraPreview } from '@capacitor-community/camera-preview'
import { Capacitor } from '@capacitor/core'

export async function startNativeCamera() {
  return CameraPreview.start({
    position: 'rear',
    toBack: true,
    enableOpacity: true,
    storeToFile: false,
  })
}

export async function stopNativeCamera() {
  if (Capacitor.isNativePlatform()) {
    await CameraPreview.stop()
  }
}

export async function takePhoto(videoElement) {
  if (Capacitor.isNativePlatform()) {
    const result = await startNativeCamera()

    if (!result.value) {
      throw new Error('Camera did not return an image')
    }

    return {
      webPath: `data:image/jpeg;base64,${result.value}`,
      format: 'jpeg',
    }
  }

  if (!videoElement || !videoElement.videoWidth) {
    throw new Error('Camera is not ready yet')
  }

  const canvas = document.createElement('canvas')
  canvas.width = videoElement.videoWidth
  canvas.height = videoElement.videoHeight

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Could not create canvas context')
  }

  context.drawImage(videoElement, 0, 0)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result)
        else reject(new Error('Failed to capture photo'))
      },
      'image/jpeg',
      0.85,
    )
  })

  return {
    webPath: URL.createObjectURL(blob),
    format: 'jpeg',
  }
}
