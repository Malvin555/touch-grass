<script setup>
import { ICONS } from '../../constants/icons'
import TgDayBadge from './TgDayBadge.vue'
defineProps({
  streak: { type: Number, required: true },
  days: { type: Array, required: true },
  message: String,
})
</script>

<template>
  <section class="flex flex-col gap-2.5 rounded-3xl bg-card p-[18px]">
    <div class="flex items-start justify-between">
      <p class="flex h-[27px] items-center gap-1 font-display font-extrabold text-[20px] text-ink">
        {{ streak }}-day streak
        <span :class="ICONS.leaf" class="size-5" aria-hidden="true" />
      </p>
      <div class="flex gap-[7px]">
        <TgDayBadge v-for="(d, i) in days" :key="i" :letter="d.letter" :visited="d.active" />
      </div>
    </div>
    <p v-if="message" class="font-sans text-[13px] leading-normal text-subtle">{{ message }}</p>
  </section>
</template>
