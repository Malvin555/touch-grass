<script setup>
defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  variant: { type: String, default: 'collectible' }, // collectible | permission
})
</script>

<template>
  <span
    :class="
      variant === 'collectible'
        ? 'flex h-12 min-w-0 items-center gap-[9px] radChip border border-line bg-card px-[14px]'
        : 'inline-flex items-center gap-1.5 radChip bg-card px-3 py-2'
    "
  >
    <span
      :class="[icon, variant === 'collectible' ? 'size-6' : 'size-5']"
      class="shrink-0 text-ink"
      aria-hidden="true"
    />
    <span
      class="whitespace-nowrap font-sans font-extrabold text-ink"
      :class="variant === 'collectible' ? 'text-[15px]' : 'text-[13px]'"
      >{{ label }}</span
    >
  </span>
</template>
