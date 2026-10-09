<script setup>
defineProps({
  label: String,
  icon: String,
  type: { type: String, default: 'button' },
  disabled: Boolean,
  block: { type: Boolean, default: true },
})
defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="tg-press min-h-12 h-[60px] items-center justify-center gap-1.5 px-3 radButton bg-action text-on-action font-sans font-black text-[15px] shadow-soft active:bg-action-pressed disabled:opacity-50 disabled:pointer-events-none focus-visible:(outline-2 outline-offset-2 outline-action)"
    :class="block ? 'flex w-full' : 'inline-flex'"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" :class="icon" class="size-[18px] shrink-0" aria-hidden="true" />
    <slot>{{ label }}</slot>
  </button>
</template>
