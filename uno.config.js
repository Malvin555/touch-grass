import { defineConfig, presetWind4 } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { ICONS } from './src/constants/icons.js'

const sunlight = `
  --tg-canvas: #F4EDE4;
  --tg-card: #FFFCF7;
  --tg-raised: #E5EBD9;
  --tg-line: #D8DFD2;
  --tg-ink: #1F3A2E;
  --tg-subtle: #68766B;
  --tg-action: #4A7C59;
  --tg-action-pressed: #3C6748;
  --tg-on-action: #FFFCF7;
  --tg-accent-ink: #4A7C59;
  --tg-scrim: rgb(23 41 31 / 0.5);
`
const dusk = `
  --tg-canvas: #17291F;
  --tg-card: #22392C;
  --tg-raised: #2D4736;
  --tg-line: #405744;
  --tg-ink: #F4EDE4;
  --tg-subtle: #B4C3AF;
  --tg-action: #A7C79B;
  --tg-action-pressed: #8CAA81;
  --tg-on-action: #1F3A2E;
  --tg-accent-ink: #A7C79B;
  --tg-scrim: rgb(23 41 31 / 0.5);
`

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({ extraProperties: { display: 'inline-block', 'vertical-align': 'middle' } }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Nunito Sans:400,700,800,900',
        display: 'Nunito:800',
      },
      processors: createLocalFontProcessor({
        cacheDir: 'node_modules/.cache/unocss/fonts',
        fontAssetsDir: 'public/assets/fonts',
        fontServeBaseUrl: '/assets/fonts',
      }),
    }),
  ],

  safelist: Object.values(ICONS),

  preflights: [
    {
      getCSS: () => `
        :root, [data-mode='sunlight'] { ${sunlight} color-scheme: light; }
        [data-mode='dusk'] { ${dusk} color-scheme: dark; }
      `,
    },
  ],

  theme: {
    colors: {
      moss: '#4A7C59',
      sand: '#F4EDE4',
      forest: '#1F3A2E',
      sky: '#A8C5DA',
      sun: '#F2C14E',
      reward: '#F2C14E',

      canvas: 'var(--tg-canvas)',
      card: 'var(--tg-card)',
      raised: 'var(--tg-raised)',
      line: 'var(--tg-line)',
      ink: 'var(--tg-ink)',
      subtle: 'var(--tg-subtle)',
      action: 'var(--tg-action)',
      'action-pressed': 'var(--tg-action-pressed)',
      'on-action': 'var(--tg-on-action)',
      'accent-ink': 'var(--tg-accent-ink)',
      scrim: 'var(--tg-scrim)',
    },
    shadow: {
      soft: '0 4px 16px 0 rgb(31 58 46 / 0.04)',
    },
  },

  shortcuts: {
    radCard: 'rounded-3xl',
    radInner: 'rounded-2xl',
    radButton: 'rounded-2xl',
    radChip: 'rounded-full',
    'tg-press':
      'transition-[transform,background-color,border-color] duration-[130ms] ease-out active:scale-[0.97] active:duration-[90ms] motion-reduce:transition-none motion-reduce:active:scale-100',

    'tg-card': 'bg-card border border-line radCard',
    'tg-heading': 'font-display font-extrabold leading-[1.15] text-ink',
    'tg-eyebrow': 'font-sans font-black text-[11px] uppercase text-accent-ink',
  },
})
