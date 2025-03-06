import type { VuetifyOptions } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'

const vuetifyConfig: VuetifyOptions = {
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: 'customDark',
    themes: {
      customDark: {
        dark: true,
        colors: {
          main: '#fff',
          secondary: '#ccc',
          'secondary--static': '#ccc',
          'secondary-light': '#373737',
          'secondary-deep': '#9e9e9e',
          'secondary-deep--static': '#9e9e9e',
          white: '#fff',
          background: '#101010',
          'background-deep': '#000',
          accent: '#D50000',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none; font-weight: bold',
    },
  },
}

export default vuetifyConfig
