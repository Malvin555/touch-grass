<template>
  <span class="flex h-[5px] w-[25px] items-center justify-between" aria-hidden="true">
    <span
      v-for="i in 3"
      :key="i"
      class="tg-dot size-[5px] rounded-full bg-subtle"
      :style="{ animationDelay: `${(i - 1) * 150}ms` }"
    />
  </span>
</template>

<style scoped>
.tg-dot {
  animation: tg-dot 900ms ease-in-out infinite;
}
@keyframes tg-dot {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tg-dot {
    animation: none;
    opacity: 0.7;
  }
}
</style>
