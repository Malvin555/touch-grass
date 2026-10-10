<script setup>
import { ICONS } from '@/constants/icons'

const steps = [
  {
    icon: ICONS.target,
    label: 'Choose your adventure',
    text: 'Pick a mission — Walk, Nature, Exercise, or Explore,',
  },
  {
    icon: ICONS.walk,
    label: 'A little less online',
    text: 'Go outside and complete the challenge',
    active: true,
  },
  {
    icon: ICONS.camera,
    label: 'Bring back proof',
    text: 'Snap a photo and let AI verify your find',
  },
]
</script>

<template>
  <section class="flex flex-1 flex-col gap-7 pt-7">
    <header class="flex flex-col gap-2">
      <h1 class="tg-heading text-[34px]">How It Works</h1>
      <p class="text-base leading-normal text-subtle">A little curiosity. A little fresh air.</p>
    </header>

    <ol class="flex flex-col gap-4">
      <li
        v-for="s in steps"
        :key="s.label"
        class="step-card flex h-[132px] items-center gap-4 rounded-3xl border border-line p-5"
        :class="s.active ? 'bg-raised step-active' : 'bg-card'"
      >
        <div class="relative h-[54px] w-[46px] shrink-0">
          <span
            class="absolute inset-x-0 top-0.5 h-[50px] -rotate-[10deg] rounded-[58%_42%_55%_45%/50%_60%_40%_50%]"
            :class="s.active ? 'bg-card' : 'bg-raised'"
          />
          <span
            :class="s.icon"
            class="absolute left-1.5 top-[11px] size-8 text-action"
            aria-hidden="true"
          />
        </div>
        <div class="flex min-w-0 flex-col gap-1">
          <span class="text-[10px] font-black uppercase tracking-wider text-accent">{{
            s.label
          }}</span>
          <p class="font-display text-lg font-extrabold leading-[1.3] text-ink">{{ s.text }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.step-active {
  animation: drift 1.2s ease-out 1 both;
}
@keyframes drift {
  0%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .step-active {
    animation: none;
  }
}
</style>
