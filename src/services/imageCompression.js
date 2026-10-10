const MAX_IMAGE_SIZE = 1280
const JPEG_QUALITY = 0.75

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not load photo'))

    image.src = source
  })
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not compress photo'))
      },
      'image/jpeg',
      JPEG_QUALITY,
    )
  })
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read compressed photo'))

    reader.readAsDataURL(blob)
  })
}

export async function compressImage(source) {
  if (typeof source !== 'string' || !source) {
    throw new Error('A valid photo source is required')
  }

  const image = await loadImage(source)

  const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(image.naturalWidth, image.naturalHeight))

  const width = Math.max(1, Math.round(image.naturalWidth * scale))
  const height = Math.max(1, Math.round(image.naturalHeight * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Could not prepare photo for compression')
  }

  context.drawImage(image, 0, 0, width, height)

  const blob = await canvasToBlob(canvas)

  return blobToDataUrl(blob)
}
