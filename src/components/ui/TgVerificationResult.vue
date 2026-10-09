<script setup>
import { ICONS } from '../../constants/icons'
import TgIconText from './TgIconText.vue'
import TgConfidenceBar from './TgConfidenceBar.vue'
defineProps({
  result: { type: String, required: true },
  confidence: { type: Number, required: true },
})
</script>

<template>
  <section class="flex flex-col gap-[9px]">
    <TgIconText :icon="ICONS.robot" :size="11" weight="black" tone="accent" uppercase
      >AI verification</TgIconText
    >
    <p class="font-display font-extrabold text-[31px] leading-[1.15] text-ink">
      Likely: {{ result }}
    </p>
    <p class="font-sans font-bold text-[13px] text-subtle">Confidence: {{ confidence }}%</p>
    <TgConfidenceBar :value="confidence" />
    <p class="font-sans text-[13px] leading-normal text-subtle">
      Likely a {{ result.toLowerCase() }} — {{ confidence }}% confidence
    </p>
  </section>
</template>
