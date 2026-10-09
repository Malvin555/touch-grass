<script setup>
import { ICONS } from '../../constants/icons'
defineProps({ label: { type: String, required: true } })
defineEmits(['back'])
</script>

<template>
  <nav class="flex h-11 shrink-0 items-center justify-between px-6">
    <button type="button" class="tg-press flex h-11 items-center gap-2" @click="$emit('back')">
      <span :class="ICONS.arrowRight" class="size-6 rotate-180 text-ink" aria-hidden="true" />
      <span class="font-sans text-[14px] font-extrabold text-ink">{{ label }}</span>
    </button>
    <span :class="ICONS.leaf" class="size-[26px] text-ink" aria-hidden="true" />
  </nav>
</template>
