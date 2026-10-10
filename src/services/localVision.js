import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { ImageLabeling } from '@capacitor-mlkit/image-labeling'

export async function getModel() {
  if (!Capacitor.isNativePlatform()) {
    throw new Error('AI image labeling requires the native app.')
  }

  return true
}

async function preparePhoto(photo) {
  if (typeof photo !== 'string' || !photo) {
    throw new Error('No photo was provided for analysis.')
  }

  if (photo.startsWith('data:image/')) {
    const commaIndex = photo.indexOf(',')

    if (commaIndex < 0) {
      throw new Error('The captured image is invalid.')
    }

    const savedFile = await Filesystem.writeFile({
      path: `touchgrass-${Date.now()}.jpg`,
      data: photo.slice(commaIndex + 1),
      directory: Directory.Cache,
    })

    return savedFile.uri
  }

  if (photo.startsWith('blob:') || photo.startsWith('http')) {
    throw new Error('AI requires a local image file on the device.')
  }

  return photo
}

export async function classifyImage(photo) {
  await getModel()

  try {
    const path = await preparePhoto(photo)

    const { labels } = await ImageLabeling.processImage({
      path,
      confidenceThreshold: 0,
    })

    if (!labels?.length) {
      throw new Error('The AI could not identify anything in this photo.')
    }

    const sortedLabels = [...labels].sort((a, b) => b.confidence - a.confidence)

    const best = sortedLabels[0]

    return {
      label: best.text,
      confidence: best.confidence,
      labels: sortedLabels.map((item) => ({
        text: item.text,
        confidence: item.confidence,
      })),
    }
  } catch (error) {
    console.error('Native AI verification failed:', error)
    throw error
  }
}
