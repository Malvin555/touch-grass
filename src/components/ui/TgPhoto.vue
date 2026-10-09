<script setup>
defineProps({
  src: String,
  alt: { type: String, default: '' },
  tone: { type: String, default: 'leaf' },
})
const tones = {
  leaf: 'bg-gradient-to-br from-[#A9C49A] to-[#4A7C59]',
  walk: 'bg-gradient-to-br from-[#E5EBD9] to-[#8FB29B]',
  sky: 'bg-gradient-to-br from-sky to-[#E5EBD9]',
}
</script>

<template>
  <div class="relative overflow-hidden" :class="!src && tones[tone]">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="absolute inset-0 size-full object-cover"
      loading="lazy"
    />
  </div>
</template>
