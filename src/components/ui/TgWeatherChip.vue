<script setup>
import { computed } from 'vue'

const props = defineProps({
  condition: { type: String, default: 'challenge' },
})

const MAP = {
  challenge: { icon: 'i-ph-leaf', text: 'Explore' },
  listen: { icon: 'i-ph-ear', text: 'Listen' },
  clouds: { icon: 'i-ph-cloud', text: 'Look up' },
  tiny: { icon: 'i-ph-magnifying-glass', text: 'Discover' },
  green: { icon: 'i-ph-plant', text: 'Find green' },
}

const meta = computed(() => MAP[props.condition] ?? MAP.challenge)
</script>

<template>
  <div
    class="inline-flex h-[38px] items-center justify-center gap-1 radChip bg-card px-3 py-2.5"
    role="status"
  >
    <span :class="meta.icon" class="size-[14px] text-ink" aria-hidden="true" />
    <span class="whitespace-nowrap font-sans text-[13px] font-bold text-ink">
      {{ meta.text }}
    </span>
  </div>
</template>
