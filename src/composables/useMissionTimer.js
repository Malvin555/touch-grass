import { computed, onBeforeUnmount, ref } from 'vue'

export function useMissionTimer(duration, startedAt, onComplete) {
  const now = ref(Date.now())

  let interval = null

  const remainingSeconds = computed(() => {
    if (!startedAt) {
      return duration
    }

    const elapsed = Math.floor((now.value - startedAt) / 1000)

    return Math.max(duration - elapsed, 0)
  })

  const elapsedSeconds = computed(() => {
    return Math.max(duration - remainingSeconds.value, 0)
  })

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')

    const secs = (seconds % 60).toString().padStart(2, '0')

    return `${minutes}:${secs}`
  }

  const remainingTime = computed(() => formatTime(remainingSeconds.value))

  const elapsedTime = computed(() => formatTime(elapsedSeconds.value))

  const totalTime = computed(() => formatTime(duration))

  const start = () => {
    if (interval !== null) {
      return
    }

    interval = window.setInterval(() => {
      now.value = Date.now()

      if (remainingSeconds.value <= 0) {
        stop()
        onComplete()
      }
    }, 250)
  }

  const stop = () => {
    if (interval !== null) {
      window.clearInterval(interval)
      interval = null
    }
  }

  onBeforeUnmount(stop)

  return {
    remainingSeconds,
    elapsedSeconds,
    remainingTime,
    elapsedTime,
    totalTime,
    start,
    stop,
  }
}
