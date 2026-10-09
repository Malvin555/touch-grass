<script setup>
import { ICONS } from '../../constants/icons'
import TgPhoto from './TgPhoto.vue'
defineProps({
  src: String,
  caption: { type: String, required: true },
  tone: { type: String, default: 'leaf' },
})
</script>

<template>
  <figure class="flex flex-col gap-3.5 overflow-hidden rounded-3xl border border-line bg-card p-2">
    <TgPhoto :src="src" :tone="tone" :alt="caption" class="h-[344px] w-full rounded-[20px]" />
    <figcaption class="flex items-center gap-2 px-2 pb-2">
      <span :class="ICONS.camera" class="size-5 shrink-0 text-subtle" aria-hidden="true" />
      <span class="min-w-0 flex-1 font-sans text-[13px] text-subtle">{{ caption }}</span>
    </figcaption>
  </figure>
</template>
