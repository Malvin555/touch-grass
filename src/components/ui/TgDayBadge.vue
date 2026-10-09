<script setup>
defineProps({
  letter: { type: String, required: true },
  visited: { type: Boolean, default: true },
})
</script>

<template>
  <span
    class="flex size-6 items-center justify-center rounded-xl font-sans font-extrabold text-[11px]"
    :class="visited ? 'bg-raised text-accent-ink' : 'border border-line text-subtle'"
    >{{ letter }}</span
  >
</template>
