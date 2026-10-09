<script setup>
defineProps({
  icon: String,
  iconAfter: Boolean,
  iconSize: { type: Number, default: 14 },
  size: { type: Number, default: 13 },
  weight: { type: String, default: 'regular' },
  tone: { type: String, default: 'subtle' },
  uppercase: Boolean,
  display: Boolean,
})

const sizes = {
  11: 'text-[11px]',
  12: 'text-[12px]',
  13: 'text-[13px]',
  14: 'text-[14px]',
  17: 'text-[17px]',
  20: 'text-[20px]',
  24: 'text-[24px]',
}
const weights = {
  regular: 'font-normal',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
}
const tones = { ink: 'text-ink', subtle: 'text-subtle', accent: 'text-accent-ink' }
const iconSizes = { 14: 'size-[14px]', 18: 'size-[18px]', 20: 'size-5', 24: 'size-6' }
</script>

<template>
  <span
    class="inline-flex items-center gap-1 whitespace-nowrap leading-none"
    :class="[
      display ? 'font-display font-extrabold' : ['font-sans', weights[weight]],
      sizes[size],
      tones[tone],
      uppercase && 'uppercase',
    ]"
  >
    <span
      v-if="icon && !iconAfter"
      :class="[icon, iconSizes[iconSize]]"
      class="shrink-0"
      aria-hidden="true"
    />
    <slot />
    <span
      v-if="icon && iconAfter"
      :class="[icon, iconSizes[iconSize]]"
      class="shrink-0"
      aria-hidden="true"
    />
  </span>
</template>
