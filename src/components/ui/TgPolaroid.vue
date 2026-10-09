<script setup>
import { ICONS } from '../../constants/icons'
import TgPhoto from './TgPhoto.vue'
defineProps({
  src: String,
  title: { type: String, required: true },
  date: { type: String, required: true },
  featured: Boolean,
  tone: { type: String, default: 'leaf' },
})
defineEmits(['open'])
</script>

<template>
  <button
    type="button"
    class="tg-press flex flex-col gap-2 rounded-[20px] border border-line bg-card p-2.5 text-left shadow-[0_4px_12px_0_rgb(31_58_46/0.05)]"
    @click="$emit('open')"
  >
    <TgPhoto
      :src="src"
      :tone="tone"
      :alt="title"
      class="w-full rounded-[14px]"
      :class="featured ? 'h-[180px]' : 'h-[116px]'"
    />
    <span class="flex w-full items-center gap-1">
      <span class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          class="font-display font-extrabold leading-[1.2] text-ink"
          :class="featured ? 'text-[19px]' : 'text-[14px]'"
          >{{ title }}</span
        >
        <span class="font-sans text-[12px] leading-[1.3] text-subtle">{{ date }}</span>
      </span>
      <span
        v-if="featured"
        :class="ICONS.arrowRight"
        class="size-5 shrink-0 text-ink"
        aria-hidden="true"
      />
    </span>
  </button>
</template>
