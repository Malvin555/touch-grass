<script setup>
defineProps({ icon: { type: String, required: true }, label: { type: String, required: true } })
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    class="tg-press flex size-[38px] shrink-0 items-center justify-center rounded-full border border-line bg-card shadow-[0_4px_8px_0_rgb(31_58_46/0.04)]"
    @click="$emit('click', $event)"
  >
    <span :class="icon" class="size-[18px] text-ink" aria-hidden="true" />
  </button>
</template>
