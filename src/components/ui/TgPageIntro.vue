<script setup>
defineProps({ eyebrow: String, title: { type: String, required: true }, subtitle: String })
</script>

<template>
  <header class="flex flex-col gap-2">
    <p v-if="eyebrow" class="font-sans text-[11px] font-extrabold uppercase text-subtle">
      {{ eyebrow }}
    </p>
    <h1 class="font-display text-[36px] font-extrabold leading-[1.15] text-ink">{{ title }}</h1>
    <p v-if="subtitle" class="font-sans text-[15px] leading-normal text-subtle">{{ subtitle }}</p>
  </header>
</template>
