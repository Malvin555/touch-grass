<script setup>
import { ICONS } from '../../constants/icons'
defineProps({ points: { type: Number, required: true } })
</script>

<template>
  <span
    class="inline-flex items-center gap-1 radChip bg-reward px-4 py-2 font-sans font-black text-[17px] text-forest"
  >
    <span :class="ICONS.sparkle" class="size-[17px]" aria-hidden="true" />
    +{{ points }} Grass Points
  </span>
</template>
