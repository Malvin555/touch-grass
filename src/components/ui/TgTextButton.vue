<script setup>
defineProps({ icon: String })
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="tg-press inline-flex min-h-12 items-center gap-1 font-sans font-extrabold text-[15px] text-accent-ink focus-visible:(outline-2 outline-action)"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" :class="icon" class="size-[14px]" aria-hidden="true" />
    <slot />
  </button>
</template>
