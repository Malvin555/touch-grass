<script setup>
import TgTextButton from './TgTextButton.vue'
defineProps({ label: String, showBack: Boolean, showSkip: Boolean })
defineEmits(['back', 'skip'])
</script>

<template>
  <nav class="flex h-11 shrink-0 items-center justify-between px-6">
    <TgTextButton v-if="showBack" @click="$emit('back')">Back</TgTextButton>
    <span v-else-if="label" class="font-sans font-extrabold text-[11px] uppercase text-subtle">{{
      label
    }}</span>
    <span v-else />
    <TgTextButton v-if="showSkip" @click="$emit('skip')">Skip</TgTextButton>
  </nav>
</template>
