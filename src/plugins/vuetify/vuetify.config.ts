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
          'main-100': '#fff',
          'main-200': '#ccc',
          'main-300': '#9e9e9e',
          accent: '#D50000',
          header: '#000',
          background: '#101010',
          footer: '#212121',
          white: '#fff',
          grey: '#ccc',
          'grey-deep': '#9e9e9e',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none; font-weight: bold',
    },
    VTextField: {
      variant: 'solo-filled',
      hideDetails: true,
      clearable: true,
    },
    VCard: {
      rounded: 'lg',
    },
    VAutocomplete: {
      variant: 'solo-filled',
      hideDetails: true,
      clearable: true,
    },
  },
}

export default vuetifyConfig
