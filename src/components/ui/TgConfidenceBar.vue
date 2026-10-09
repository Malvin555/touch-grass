<script setup>
import { computed } from 'vue'
const props = defineProps({ value: { type: Number, required: true } })
const pct = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<template>
  <div
    class="h-[5px] w-full overflow-hidden rounded-[5px] bg-line"
    role="meter"
    aria-label="Confidence"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="pct"
  >
    <div
      class="h-full rounded-[5px] bg-action transition-[width] duration-[400ms] ease-out motion-reduce:transition-none"
      :style="{ width: `${pct}%` }"
    />
  </div>
</template>
