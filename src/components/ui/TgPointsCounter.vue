<script setup>
import { computed } from 'vue'
import TgRewardSeal from './TgRewardSeal.vue'
import { useCountUp } from '../../composables/useCountUp'

const props = defineProps({
  points: { type: Number, required: true },
  earned: Number,
  label: { type: String, default: 'YOUR GRASS POINTS' },
  note: String,
  animate: Boolean,
})

const shown = useCountUp(() => props.points, {
  from: () => props.points - (props.earned ?? 0),
  enabled: () => props.animate && !!props.earned,
})

const caption = computed(
  () =>
    props.note ??
    (props.earned ? `${props.points - props.earned} + ${props.earned} from today’s adventure` : ''),
)
</script>

<template>
  <section class="flex flex-col gap-1 rounded-3xl bg-raised p-6" aria-live="polite">
    <p class="font-sans font-extrabold text-[12px] text-subtle">{{ label }}</p>
    <div class="flex items-center justify-between">
      <span class="font-display font-extrabold text-[54px] text-ink tabular-nums">{{ shown }}</span>
      <TgRewardSeal />
    </div>
    <p v-if="caption" class="font-sans text-[13px] text-ink">{{ caption }}</p>
  </section>
</template>
