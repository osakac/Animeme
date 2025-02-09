import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import '@fortawesome/fontawesome-free/css/all.css'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import vuetifyConfig from './plugins/vuetify/vuetify.config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuetify(vuetifyConfig))

app.mount('#app')
