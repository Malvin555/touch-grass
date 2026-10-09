<script setup>
import { ICONS } from '@/constants/icons'
import TgIconText from './TgIconText.vue'
import TgBotanicalStudy from '@/components/svg/TgBotanicalStudy.vue'

defineProps({
  title: { type: String, required: true },
  minutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  task: { type: String, required: true },
  challenge: String,
})
</script>

<template>
  <article
    class="flex flex-col gap-[18px] overflow-hidden rounded-3xl border border-line bg-card p-[22px]"
  >
    <slot name="illustration"><TgBotanicalStudy /></slot>

    <div class="flex flex-col gap-[7px]">
      <h2 class="font-display text-[30px] font-extrabold leading-[1.15] text-ink">{{ title }}</h2>
      <p class="flex h-[21px] items-center gap-1 font-sans text-[14px] text-subtle">
        <span :class="ICONS.timer" class="size-[14px]" aria-hidden="true" />
        {{ minutes }} min ·
        <span :class="ICONS.star" class="size-[14px]" aria-hidden="true" />
        {{ difficulty }}
      </p>
    </div>

    <div class="flex flex-col gap-[7px]">
      <TgIconText :icon="ICONS.target" :size="11" weight="black" tone="accent" uppercase
        >Mission</TgIconText
      >
      <p class="font-display text-[23px] font-extrabold leading-tight text-ink">{{ task }}</p>
    </div>

    <div v-if="challenge" class="flex flex-col gap-[7px] rounded-2xl bg-raised p-[15px]">
      <TgIconText :icon="ICONS.noPhone" :size="11" weight="black" tone="accent" uppercase
        >Challenge</TgIconText
      >
      <p class="font-sans text-[16px] font-bold leading-[1.4] text-ink">{{ challenge }}</p>
    </div>
  </article>
</template>
