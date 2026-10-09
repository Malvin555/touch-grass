import { ref } from 'vue'

const preference = ref('auto')
const mode = ref('sunlight')

function resolveAuto() {
  const h = new Date().getHours()
  return h >= 18 || h < 6 ? 'dusk' : 'sunlight'
}

function syncNativeTheme(theme) {
  if (typeof window === 'undefined') return

  window.TouchGrassNative?.setTheme(theme)
}

function apply() {
  mode.value = preference.value === 'auto' ? resolveAuto() : preference.value

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.mode = mode.value
  }

  syncNativeTheme(mode.value)
}

export function useTheme() {
  return {
    preference,
    mode,
    init: apply,
    setPreference(p) {
      preference.value = p
      apply()
    },
  }
}
