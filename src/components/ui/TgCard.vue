<script setup>
defineProps({
  tone: { type: String, default: 'card' }, // card | raised
  bordered: Boolean,
  as: { type: String, default: 'div' },
})
</script>

<template>
  <component
    :is="as"
    class="rounded-3xl overflow-hidden"
    :class="[tone === 'card' ? 'bg-card' : 'bg-raised', bordered && 'border border-line']"
  >
    <slot />
  </component>
</template>
