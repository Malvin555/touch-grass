<script setup>
import { ICONS } from '../../constants/icons'

defineProps({
  instruction: { type: String, required: true },
  hint: String,
})
</script>

<template>
  <div
    class="camera-viewfinder relative flex h-[500px] w-full flex-col items-center justify-between overflow-hidden bg-transparent px-6 py-[26px]"
  >
    <div class="absolute inset-0 bg-transparent">
      <slot />
    </div>

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgb(19_39_25/0.6)] via-[rgb(19_39_25/0)] via-35% to-[rgb(19_39_25/0.4)]"
    />

    <p class="relative z-10 text-center font-display text-[24px] font-extrabold text-[#FFFCF7]">
      {{ instruction }}
    </p>

    <div
      class="pointer-events-none absolute left-1/2 top-[112px] z-10 flex size-[290px] -translate-x-1/2 items-center justify-center"
      aria-hidden="true"
    >
      <span :class="ICONS.cornersOut" class="size-12 text-[#FFFCF7]" />
    </div>

    <p v-if="hint" class="relative z-10 font-sans text-[13px] font-bold text-[#FFFCF7]">
      {{ hint }}
    </p>
  </div>
</template>
