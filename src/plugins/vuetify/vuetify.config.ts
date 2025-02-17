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
}

export default vuetifyConfig
