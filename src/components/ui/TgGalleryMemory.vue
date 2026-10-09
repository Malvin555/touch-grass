<script setup>
import TgPhoto from './TgPhoto.vue'
defineProps({
  src: String,
  title: { type: String, required: true },
  date: { type: String, required: true },
  tone: { type: String, default: 'leaf' },
})
</script>

<template>
  <figure class="flex min-w-0 flex-1 flex-col gap-1.5">
    <TgPhoto :src="src" :tone="tone" :alt="title" class="h-[108px] w-full rounded-2xl" />
    <figcaption class="flex flex-col gap-1.5">
      <span class="font-sans text-[11px] font-extrabold text-ink">{{ title }}</span>
      <span class="font-sans text-[10px] text-subtle">{{ date }}</span>
    </figcaption>
  </figure>
</template>
