<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import TgScreen from '../ui/TgScreen.vue'
import TgBackNav from '../ui/TgBackNav.vue'
import TgScreenHeader from '../ui/TgScreenHeader.vue'
import { useGo } from '@/composables/useGo'

const go = useGo()
const route = useRoute()

const meta = computed(() => route.meta)
const preview = computed(() => 'preview' in route.query)

watch(
  () => route.meta.title,
  (title) => {
    document.title = title ? `${title} | Touch Grass` : 'Touch Grass'
  },
  { immediate: true },
)
</script>

<template>
  <TgScreen :preview="preview" :flush="meta.flush">
    <template #header>
      <TgBackNav v-if="meta.nav === 'back'" :label="meta.backLabel" @back="go(meta.backTo)" />
      <TgScreenHeader v-else :label="meta.title" :leading-icon="meta.leadingIcon" />
    </template>

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </TgScreen>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 180ms ease-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition-duration: 1ms;
  }
}
</style>
