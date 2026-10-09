<script setup>
import TgChip from './TgChip.vue'
defineProps({
  message: { type: String, required: true },
  footnote: String,
  permissions: { type: Array, required: true },
})
</script>

<template>
  <section class="flex flex-col gap-3.5 rounded-3xl bg-raised p-[18px]">
    <p class="font-sans font-bold text-[15px] leading-[1.45] text-ink">{{ message }}</p>
    <div class="flex gap-2.5">
      <TgChip
        v-for="p in permissions"
        :key="p.label"
        variant="permission"
        :icon="p.icon"
        :label="p.label"
      />
    </div>
    <p v-if="footnote" class="font-sans text-[12px] leading-[1.4] text-subtle">{{ footnote }}</p>
  </section>
</template>
