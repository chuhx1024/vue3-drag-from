import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
