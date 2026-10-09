<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TgScreen from '../ui/TgScreen.vue'
import TgPageDots from '../ui/TgPageDots.vue'
import TgButton from '../ui/TgButton.vue'
import TgOnboardingNav from '../ui/TgOnboardingNav.vue'

const route = useRoute()
const router = useRouter()
const steps = ['welcome', 'how', 'collect']
const step = computed(() => route.meta.step)

const next = () => router.push({ name: step.value < 2 ? steps[step.value + 1] : 'home' })
</script>

<template>
  <TgScreen>
    <template #header>
      <TgOnboardingNav
        :label="route.meta.label"
        :show-back="route.meta.back"
        :show-skip="route.meta.skip"
        @back="router.back()"
        @skip="router.push({ name: 'home' })"
      />
    </template>

    <RouterView />

    <template #footer>
      <TgPageDots :total="3" :current="step" />
      <TgButton :label="route.meta.cta" @click="next" />
    </template>
  </TgScreen>
</template>
