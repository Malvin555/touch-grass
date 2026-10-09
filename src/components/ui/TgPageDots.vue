<script setup>
defineProps({
  total: { type: Number, required: true },
  current: { type: Number, required: true },
})
</script>

<template>
  <div
    class="flex h-[26px] items-center justify-center gap-2"
    role="img"
    :aria-label="`Page ${current + 1} of ${total}`"
  >
    <span
      v-for="i in total"
      :key="i"
      class="h-[7px] radChip transition-[width,background-color] duration-[180ms] ease-out motion-reduce:transition-none"
      :class="i - 1 === current ? 'w-6 bg-action' : 'w-[7px] bg-line'"
    />
  </div>
</template>
