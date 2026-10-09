<script setup>
import { ICONS } from '../../constants/icons'
defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  size: { type: Number, default: 24 },
  rotate: { type: Number, default: 0 },
  delay: { type: Number, default: 0 },
})
const sizes = { 20: 'size-5', 24: 'size-6' }
</script>

<template>
  <span
    class="tg-leaf pointer-events-none absolute size-[100px] text-action"
    :style="{
      left: `${x - 50}px`,
      top: `${y - 50}px`,
      '--r': `${rotate}deg`,
      animationDelay: `${delay}ms`,
    }"
    aria-hidden="true"
  >
    <span :class="[ICONS.leaf, sizes[size] ?? 'size-6']" class="absolute left-[18px] top-[7px]" />
  </span>
</template>

<style scoped>
.tg-leaf {
  animation: tg-leaf-drift 1200ms ease-out both;
}
@keyframes tg-leaf-drift {
  0% {
    transform: translateY(0) rotate(var(--r));
    opacity: 1;
  }
  75% {
    transform: translateY(-24px) rotate(var(--r));
    opacity: 1;
  }
  100% {
    transform: translateY(-24px) rotate(var(--r));
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tg-leaf {
    display: none;
  }
}
</style>
