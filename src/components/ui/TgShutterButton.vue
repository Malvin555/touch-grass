<script setup>
import { ICONS } from '../../constants/icons'
defineProps({ disabled: Boolean })
defineEmits(['capture'])
</script>

<template>
  <button
    type="button"
    aria-label="Capture discovery"
    :disabled="disabled"
    class="tg-press relative flex size-[84px] items-center justify-center rounded-full border-2 border-action disabled:opacity-50 focus-visible:(outline-2 outline-offset-2 outline-action)"
    @click="$emit('capture')"
  >
    <span class="size-[68px] rounded-full bg-action" />
    <span :class="ICONS.camera" class="absolute size-[30px] text-on-action" aria-hidden="true" />
  </button>
</template>
