<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import TgButton from '@/components/ui/TgButton.vue'
import TgIconText from '@/components/ui/TgIconText.vue'
import TgMissionCard from '@/components/ui/TgMissionCard.vue'

import { ICONS } from '@/constants/icons'
import { useNatureStore } from '@/stores/nature'
import { useExploreStore } from '@/stores/explore'
import { useGo } from '@/composables/useGo'

const route = useRoute()
const go = useGo()

const nature = useNatureStore()
const explore = useExploreStore()

const activity = computed(() => route.query.activity)

const mission = computed(() => {
  if (activity.value === 'nature') {
    return nature.mission
  }

  if (activity.value === 'explore') {
    return explore.prompt
  }

  return null
})

onMounted(() => {
  if (activity.value === 'nature') {
    nature.chooseRandomMission()
  } else if (activity.value === 'explore') {
    explore.chooseRandomPrompt()
  }
})

const startAdventure = () => {
  if (!mission.value) return

  if (activity.value === 'nature') {
    nature.start()
  } else if (activity.value === 'explore') {
    explore.start()
  } else {
    return
  }

  go('outside', { activity: activity.value })
}

const shuffleMission = () => {
  if (activity.value === 'nature') {
    nature.chooseRandomMission()
  } else if (activity.value === 'explore') {
    explore.chooseRandomPrompt()
  }
}
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col justify-between pb-5 pt-4">
    <section class="flex flex-col gap-4">
      <p class="font-sans text-[13px] leading-normal text-subtle">
        {{ activity === 'nature' ? 'Picked for Nature' : 'Picked for Explore' }}
      </p>
      <TgMissionCard
        v-if="mission"
        :title="mission.title"
        :minutes="mission.minutes"
        :difficulty="mission.difficulty"
        :task="mission.task"
        :challenge="mission.challenge"
      />
    </section>

    <section class="flex flex-col items-stretch gap-[18px]">
      <TgButton label="START ADVENTURE" :disabled="!mission" @click="startAdventure" />
      <button
        type="button"
        class="tg-press flex h-[18px] items-center justify-center"
        @click="shuffleMission"
      >
        <TgIconText :icon="ICONS.shuffle" :size="13" weight="bold" tone="accent">
          shuffle another mission
        </TgIconText>
      </button>
    </section>
  </div>
</template>
