import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './composables/useScrollReveal'
import { vTilt } from './composables/useTilt'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('tilt', vTilt)
app.mount('#app')
