const soundFiles = {
  success: '/assets/sounds/mission-success.mp3',
  failure: '/assets/sounds/mission-failed.mp3',
}

export function useSound() {
  function playSound(type) {
    const src = soundFiles[type]

    if (!src) {
      console.warn(`Unknown sound: ${type}`)
      return
    }

    const audio = new Audio(src)
    audio.volume = 0.65

    audio.play().catch((error) => {
      console.warn('Could not play sound:', error)
    })
  }

  return { playSound }
}
