<script setup>
import TgPaperFade from '../ui/TgPaperFade.vue'
</script>

<template>
  <div class="h-[490px] overflow-hidden bg-raised" aria-hidden="true">
    <svg viewBox="0 0 390 490" class="size-full" preserveAspectRatio="xMidYMax slice">
      <circle cx="292" cy="130" r="64" class="fill-sun" opacity=".18" />
      <circle cx="292" cy="130" r="30" class="fill-sun" />
      <path d="M40 118h62a16 16 0 0 0 0-32 22 22 0 0 0-42-4 18 18 0 0 0-20 36z" class="fill-card" />
      <path
        d="M150 190h46a12 12 0 0 0 0-24 16 16 0 0 0-31-3 13 13 0 0 0-15 27z"
        class="fill-card"
      />
      <path d="M0 330C70 270 140 270 210 312s130 18 180-24v202H0z" class="fill-card" />
      <path
        d="M0 395C90 340 200 350 290 380c40 13 70 12 100 0v110H0z"
        class="fill-action"
        opacity=".16"
      />
      <path
        d="M0 395C90 340 200 350 290 380c40 13 70 12 100 0"
        fill="none"
        class="stroke-line"
        stroke-width="2"
      />
      <path
        d="M150 490C170 450 250 440 230 410s-90-20-70-48 70-12 66-40"
        fill="none"
        class="stroke-action"
        stroke-width="10"
        stroke-linecap="round"
        opacity=".35"
      />
      <path
        d="M150 490C170 450 250 440 230 410s-90-20-70-48 70-12 66-40"
        fill="none"
        class="stroke-card"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="2 10"
      />
      <g
        class="stroke-action"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
        transform="translate(70 340)"
      >
        <path d="M0 80V20" />
        <path d="M0 50C-18 48-26 36-26 24c14 0 26 8 26 26z" class="fill-action" />
        <path d="M0 34C16 32 24 20 24 8c-14 0-24 10-24 26z" class="fill-action" />
        <circle cx="0" cy="12" r="5" class="fill-sun stroke-none" />
      </g>
    </svg>
    <TgPaperFade class="absolute inset-x-0 top-[400px]" />
  </div>
</template>
