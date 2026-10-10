<script setup>
import TgChip from '@/components/ui/TgChip.vue'
import TgPermissionNotice from '@/components/ui/TgPermissionNotice.vue'
import { ICONS } from '@/constants/icons'

const collectibles = [
  { icon: ICONS.leaf, label: 'Leaf' },
  { icon: ICONS.trash, label: 'Trash' },
  { icon: ICONS.recycle, label: 'Plastic' },
  { icon: ICONS.flower, label: 'Flower' },
  { icon: ICONS.drop, label: 'Puddle' },
  { icon: ICONS.butterfly, label: 'Insect' },
  { icon: ICONS.mountains, label: 'Stone' },
  { icon: ICONS.cloud, label: 'Cloud shape' },
]
const permissions = [{ icon: ICONS.camera, label: 'Camera' }]
</script>

<template>
  <section class="flex flex-1 flex-col gap-6 pt-7">
    <header class="flex flex-col gap-2">
      <h1 class="tg-heading text-[34px]">What You’ll Collect</h1>
      <p class="text-base leading-normal text-subtle">Little finds. Real-world memories.</p>
    </header>

    <div class="grid grid-cols-2 gap-3">
      <TgChip
        v-for="c in collectibles"
        :key="c.label"
        variant="collectible"
        :icon="c.icon"
        :label="c.label"
      />
    </div>

    <TgPermissionNotice
      message="We only use your camera when you verify a mission — never in the background"
      :permissions="permissions"
      footnote="We’ll ask when needed. You’re in control."
    />
  </section>
</template>
