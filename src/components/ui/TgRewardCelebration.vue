<script setup>
import { ICONS } from '../../constants/icons'
import TgRewardBadge from './TgRewardBadge.vue'
import TgLeafParticle from './TgLeafParticle.vue'
defineProps({
  title: { type: String, default: 'Mission Complete' },
  points: { type: Number, required: true },
  particles: { type: Boolean, default: true },
})
</script>

<template>
  <section class="tg-fade relative mx-auto h-28 w-[342px] max-w-full overflow-hidden" role="status">
    <template v-if="particles">
      <TgLeafParticle :x="326" :y="71" :size="24" :rotate="32" />
      <TgLeafParticle :x="71" :y="93" :size="20" :rotate="-24" :delay="120" />
    </template>
    <div class="absolute inset-x-0 top-[17px] flex flex-col items-center gap-2">
      <p class="flex h-[33px] items-center gap-1 font-display text-[24px] font-extrabold text-ink">
        <span :class="ICONS.checkCircle" class="size-6" aria-hidden="true" />
        {{ title }}
      </p>
      <TgRewardBadge :points="points" />
    </div>
  </section>
</template>

<style scoped>
.tg-fade {
  animation: tg-fade-in 240ms ease-out both;
}
@keyframes tg-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tg-fade {
    animation-duration: 120ms;
  }
}
</style>
