<script setup>
import { ICONS } from '../../constants/icons'
import TgIconText from './TgIconText.vue'
defineProps({
  title: { type: String, required: true },
  actionLabel: String,
  actionIcon: String,
})
defineEmits(['action'])
</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="font-display font-extrabold text-[22px] text-ink">{{ title }}</h3>
    <button v-if="actionLabel" type="button" class="tg-press min-h-6" @click="$emit('action')">
      <TgIconText
        :icon="actionIcon ?? ICONS.arrowRight"
        iconAfter
        :size="11"
        weight="bold"
        tone="subtle"
        >{{ actionLabel }}</TgIconText
      >
    </button>
  </div>
</template>
