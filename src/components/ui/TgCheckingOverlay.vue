<script setup>
import TgLoadingDots from './TgLoadingDots.vue'
defineProps({
  src: { type: String, required: true },
  message: { type: String, default: 'Checking your discovery…' },
})
</script>

<template>
  <div
    class="relative h-[220px] w-full overflow-hidden rounded-3xl"
    role="status"
    aria-live="polite"
  >
    <img :src="src" alt="" class="absolute inset-0 size-full object-cover" />
    <div class="absolute inset-0 bg-scrim" />
    <div
      class="absolute inset-x-5 top-[70px] flex flex-col items-center gap-2.5 rounded-2xl bg-card p-5"
    >
      <TgLoadingDots />
      <p class="font-sans font-extrabold text-[16px] text-ink">{{ message }}</p>
    </div>
  </div>
</template>
