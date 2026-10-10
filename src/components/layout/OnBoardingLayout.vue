<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import TgScreen from '../ui/TgScreen.vue'
import TgOnboardingNav from '../ui/TgOnboardingNav.vue'
import TgPageDots from '../ui/TgPageDots.vue'
import TgButton from '../ui/TgButton.vue'
import OnBoardingHero from '../svg/OnBoardingHero.vue'

import { useGo } from '@/composables/useGo'
import { useOnboardingStore } from '@/stores/onboarding'

const route = useRoute()
const go = useGo()
const onboarding = useOnboardingStore()

const meta = computed(() => route.meta)

const dir = ref('next')

watch(
  () => route.meta.step,
  (n, o) => {
    if (o != null && n != null) {
      dir.value = n >= o ? 'next' : 'prev'
    }
  },
  { flush: 'sync' },
)

function goBack() {
  if (typeof meta.value.back === 'string') {
    go(meta.value.back)
  }
}

function finishOnboarding() {
  onboarding.finish()
  go('home', {}, {}, { replace: true })
}

function continueOnboarding() {
  if (!meta.value.next) return

  if (meta.value.next === 'home') {
    finishOnboarding()
    return
  }

  go(meta.value.next)
}
</script>

<template>
  <TgScreen flush>
    <div class="relative flex min-h-0 flex-1 flex-col">
      <Transition name="fade">
        <OnBoardingHero v-if="meta.hero" class="absolute inset-x-0 top-0" />
      </Transition>

      <TgOnboardingNav
        class="relative z-10"
        :label="meta.label"
        :show-back="!!meta.back"
        :show-skip="!!meta.skip"
        @back="goBack"
        @skip="finishOnboarding"
      />

      <RouterView v-slot="{ Component }">
        <Transition :name="`slide-${dir}`" mode="out-in">
          <component
            :is="Component"
            :key="route.name"
            class="relative z-10 flex min-h-0 flex-1 flex-col px-6"
          />
        </Transition>
      </RouterView>

      <footer class="relative z-10 flex flex-col items-center gap-4 px-6 pb-6 pt-4">
        <TgPageDots :total="3" :current="meta.step" />

        <TgButton :label="meta.cta" @click="continueOnboarding" />
      </footer>
    </div>
  </TgScreen>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition:
    transform 140ms ease-out,
    opacity 140ms ease-out;
}

.slide-next-enter-from,
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(28px);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-28px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 220ms ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .slide-next-enter-active,
  .slide-next-leave-active,
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition-duration: 150ms;
  }

  .slide-next-enter-from,
  .slide-next-leave-to,
  .slide-prev-enter-from,
  .slide-prev-leave-to {
    transform: none;
  }
}
</style>
