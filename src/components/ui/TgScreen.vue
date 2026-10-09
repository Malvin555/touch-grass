<script setup>
defineProps({ flush: Boolean })
</script>

<template>
  <div
    class="flex h-dvh w-full flex-col overflow-hidden bg-canvas pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] font-sans text-ink"
  >
    <slot name="header" />

    <main class="flex min-h-0 flex-1 flex-col overflow-y-auto" :class="!flush && 'px-6'">
      <slot />
    </main>
  </div>
</template>
