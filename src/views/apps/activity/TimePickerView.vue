<script setup>
import { ref } from 'vue'
import TgDurationOption from '@/components/ui/TgDurationOption.vue'
import TgSunPath from '@/components/svg/TgSunPath.vue'
import { useWalkStore } from '@/stores/walk'
import { useGo } from '@/composables/useGo'
import { WALK_OPTIONS } from '@/constants/walk'

const walk = useWalkStore()
const go = useGo()

const selected = ref(walk.selectedBudget ?? null)

const options = Object.keys(WALK_OPTIONS)

const selectOption = (option) => {
  if (selected.value !== option) {
    selected.value = option
    walk.selectBudget(option)
    return
  }

  walk.start()
  go('outside', { activity: 'walk' })
}
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col justify-between py-7">
    <section class="flex flex-col gap-3">
      <h1 class="tg-heading text-[34px]">How much time?</h1>
      <p class="font-sans text-[17px] leading-normal text-subtle">
        A little fresh air fits into any day.
      </p>
      <TgSunPath />
    </section>

    <section class="flex flex-col gap-3.5" role="radiogroup" aria-label="Time available">
      <TgDurationOption
        v-for="option in options"
        :key="option"
        :label="option"
        :selected="selected === option"
        @click="selectOption(option)"
      />
      <p class="text-center font-sans text-[12px] leading-normal text-subtle">
        {{ selected ? `${selected} outside. No rush.` : 'Choose your time.' }}
      </p>
    </section>
  </div>
</template>
