export async function compressImage(source, { maxSize = 1024, quality = 0.7 } = {}) {
  const image = new Image()
  image.decoding = 'async'
  image.src = source

  await new Promise((resolve, reject) => {
    image.onload = resolve
    image.onerror = () => reject(new Error('Could not load captured photo'))
  })

  const scale = Math.min(1, maxSize / image.naturalWidth, maxSize / image.naturalHeight)

  const width = Math.round(image.naturalWidth * scale)
  const height = Math.round(image.naturalHeight * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Could not create image canvas')
  }

  context.drawImage(image, 0, 0, width, height)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result)
        } else {
          reject(new Error('Could not compress captured photo'))
        }
      },
      'image/jpeg',
      quality,
    )
  })

  return await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read compressed photo'))
    reader.readAsDataURL(blob)
  })
}
