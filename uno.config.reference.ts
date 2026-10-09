import { defineConfig, presetWind4 } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetIcons from '@unocss/preset-icons'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { processors } from 'eslint-plugin-vue'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'abeezee',
        mono: 'dm-mono',
        display: 'bebas-neue',
      },
      processors: createLocalFontProcessor({
        cacheDir: 'node_modules/.cache/unocss/fonts',
        fontAssetsDir: 'public/assets/fonts',
        fontServeBaseUrl: '/assets/fonts',
      }),
    }),
  ],
  theme: {
    colors: {
      moss: '#4A7C59',
      sand: '#F4EDE4',
      forest: '#1F3A2E',
      sky: '#A8C5DA',
      sun: '#F2C14E',

      mossLight: '#6B9B7A',
      mossDark: '#3A6347',
      sandDark: '#E8DFD3',
      forestSoft: '#2A4A3C',
      leafCream: '#DCE8D5',
      leafMuted: '#3D5C4A',
      mutedText: '#6B6B6B',
      mutedTextDark: '#A8B8AE',

      bg: { DEFAULT: '#F4EDE4', dark: '#1F3A2E' },
      surface: { DEFAULT: '#E8DFD3', dark: '#2A4A3C' },
      text: { DEFAULT: '#1F3A2E', dark: '#F4EDE4' },
      muted: { DEFAULT: '#6B6B6B', dark: '#A8B8AE' },
      primary: { DEFAULT: '#4A7C59', dark: '#6B9B7A' },
      accent: { DEFAULT: '#F2C14E', dark: '#F2C14E' },
      secondary: { DEFAULT: '#A8C5DA', dark: '#A8C5DA' },
      reward: { DEFAULT: '#DCE8D5', dark: '#3D5C4A' },
    },
  },
  shortcuts: {
    radCard: 'rounded-xl',
    radButton: 'rounded-2xl',
    radChip: 'rounded-full',
  },
})
