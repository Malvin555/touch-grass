<script setup>
import { ref } from 'vue'

import TgButton from '@/components/ui/TgButton.vue'
import TgCategoryCard from '@/components/ui/TgCategoryCard.vue'
import TgChip from '@/components/ui/TgChip.vue'
import TgDurationOption from '@/components/ui/TgDurationOption.vue'
import TgMissionCard from '@/components/ui/TgMissionCard.vue'
import TgPageDots from '@/components/ui/TgPageDots.vue'
import TgPermissionNotice from '@/components/ui/TgPermissionNotice.vue'
import TgPointsCounter from '@/components/ui/TgPointsCounter.vue'
import TgRewardCelebration from '@/components/ui/TgRewardCelebration.vue'
import TgSectionHeading from '@/components/ui/TgSectionHeading.vue'
import TgStreakCard from '@/components/ui/TgStreakCard.vue'
import TgWeatherChip from '@/components/ui/TgWeatherChip.vue'
import TgShutterButton from '@/components/ui/TgShutterButton.vue'
import TgCheckingOverlay from '@/components/ui/TgCheckingOverlay.vue'
import TgVerificationResult from '@/components/ui/TgVerificationResult.vue'
import TgGalleryMemory from '@/components/ui/TgGalleryMemory.vue'
import TgScreenHeader from '@/components/ui/TgScreenHeader.vue'

import { ICONS } from '@/constants/icons'
import { useTheme } from '@/composables/useTheme'

const { mode, setPreference } = useTheme()
const duration = ref('1 hour')
const points = ref(120)
</script>

<template>
  <div class="min-h-dvh bg-canvas p-6 font-sans text-ink">
    <div class="mx-auto flex max-w-[390px] flex-col gap-8">
      <TgButton
        :label="`Switch to ${mode === 'dusk' ? 'Sunlight' : 'Dusk'}`"
        @click="setPreference(mode === 'dusk' ? 'sunlight' : 'dusk')"
      />

      <TgScreenHeader label="A little less online" />

      <section class="flex flex-col gap-3">
        <div class="flex gap-3">
          <TgCategoryCard :icon="ICONS.walk" title="Walk" hint="Find your own pace" />
          <TgCategoryCard :icon="ICONS.leaf" title="Nature" hint="Notice the little things" />
        </div>
        <div class="flex">
          <TgCategoryCard :icon="ICONS.search" title="Explore" hint="Take a curious turn" />
        </div>
      </section>

      <div class="flex justify-center"><TgWeatherChip condition="sunny" :temperature="22" /></div>

      <section class="flex flex-col gap-3.5">
        <TgDurationOption
          v-for="d in ['30 min', '1 hour', '2 hours']"
          :key="d"
          :label="d"
          :selected="duration === d"
          @select="duration = d"
        />
      </section>

      <TgMissionCard
        title="Nature Detective"
        :minutes="45"
        difficulty="Easy"
        task="Find 3 different leaf shapes"
        challenge="Stay off social media for 20 min"
        figure="fig. 01"
      />

      <TgButton label="START ADVENTURE" />
      <TgButton label="CAPTURE" :icon="ICONS.camera" />

      <div class="grid grid-cols-2 gap-3">
        <TgChip :icon="ICONS.leaf" label="Leaf" />
        <TgChip :icon="ICONS.trash" label="Trash" />
      </div>

      <TgPermissionNotice
        message="We only use your camera when you verify a mission — never in the background"
        footnote="We’ll ask when needed. You’re in control."
        :permissions="[
          { icon: ICONS.camera, label: 'Camera' },
          { icon: ICONS.mapPin, label: 'Location' },
        ]"
      />

      <TgPageDots :total="3" :current="2" />

      <TgVerificationResult result="Leaf" :confidence="94" />
      <TgRewardCelebration :points="20" />
      <TgPointsCounter :points="points + 20" :earned="20" animate />

      <TgStreakCard
        :streak="3"
        :days="[{ letter: 'M' }, { letter: 'T' }, { letter: 'W' }]"
        message="Miss a day? Nature will still be here."
      />

      <TgSectionHeading title="Little discoveries" action-label="Only you" />
      <div class="flex gap-[9px]">
        <TgGalleryMemory src="https://placehold.co/108" title="Leaf detective" date="Today" />
        <TgGalleryMemory src="https://placehold.co/108" title="A slower walk" date="Yesterday" />
      </div>

      <div class="flex justify-center"><TgShutterButton /></div>
      <TgCheckingOverlay src="https://placehold.co/342x220" />
    </div>
  </div>
</template>
