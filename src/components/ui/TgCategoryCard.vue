<script setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  hint: { type: String, required: true },
})
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="tg-press flex h-[120px] min-w-0 flex-1 flex-col items-start gap-1.5 rounded-3xl border border-line bg-card p-[18px] text-left focus-visible:(outline-2 outline-offset-2 outline-action)"
    @click="$emit('click', $event)"
  >
    <span :class="icon" class="size-[26px] text-ink" aria-hidden="true" />
    <span class="font-display text-[22px] font-extrabold text-ink">{{ title }}</span>
    <span class="whitespace-nowrap font-sans text-[12px] text-subtle">
      {{ hint }}
    </span>
  </button>
</template>
