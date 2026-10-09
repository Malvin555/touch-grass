import { onBeforeUnmount, ref, watch } from 'vue'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useCountUp(target, opts = {}) {
  const { duration = 400, delay = 160 } = opts
  const display = ref(target())
  let raf = 0
  let timer = 0

  const cancel = () => {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
  }

  watch(
    () => [target(), opts.enabled ? opts.enabled() : false],
    ([to, enabled]) => {
      cancel()
      if (!enabled || prefersReducedMotion()) {
        display.value = to
        return
      }
      const from = opts.from ? opts.from() : to
      display.value = from
      timer = window.setTimeout(() => {
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - (1 - t) ** 3 // ease-out, never bounce
          display.value = Math.round(from + (to - from) * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      }, delay)
    },
    { immediate: true },
  )

  onBeforeUnmount(cancel)
  return display
}
