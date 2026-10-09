<script setup>
import { ICONS } from '@/constants/icons'
defineProps({
  label: { type: String, required: true },
  leadingIcon: String,
  trailingIcon: { type: [String, Boolean], default: ICONS.leaf },
})
</script>

<template>
  <header class="flex h-11 shrink-0 items-center justify-between px-6">
    <span
      class="inline-flex items-center gap-1 font-sans font-extrabold text-[11px] uppercase text-subtle"
    >
      <span v-if="leadingIcon" :class="leadingIcon" class="size-[14px]" aria-hidden="true" />
      {{ label }}
    </span>
    <slot name="trailing">
      <span
        v-if="trailingIcon"
        :class="trailingIcon"
        class="size-[26px] text-ink"
        aria-hidden="true"
      />
    </slot>
  </header>
</template>
