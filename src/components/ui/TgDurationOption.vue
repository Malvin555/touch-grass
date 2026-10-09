<script setup>
import { ICONS } from '../../constants/icons'
import TgIconText from './TgIconText.vue'
defineProps({ label: { type: String, required: true }, selected: Boolean })
defineEmits(['select'])
</script>

<template>
  <button
    type="button"
    role="radio"
    :aria-checked="!!selected"
    class="tg-press flex h-[76px] w-full items-center justify-between radChip px-6 focus-visible:(outline-2 outline-offset-2 outline-action)"
    :class="selected ? 'border-2 border-action bg-raised' : 'border border-line bg-card'"
    @click="$emit('select')"
  >
    <span class="font-display font-extrabold text-[24px] text-ink">{{ label }}</span>
    <TgIconText
      v-if="selected"
      :icon="ICONS.checkCircle"
      iconAfter
      :size="13"
      weight="extrabold"
      tone="accent"
      >Selected</TgIconText
    >
    <span v-else :class="ICONS.arrowRight" class="size-[21px] text-ink" aria-hidden="true" />
  </button>
</template>
