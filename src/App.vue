<script setup>
import { ref, onMounted, provide, defineAsyncComponent } from 'vue'
import WelcomeIntro from './components/WelcomeIntro.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'

const About      = defineAsyncComponent(() => import('./components/About.vue'))
const Skills     = defineAsyncComponent(() => import('./components/Skills.vue'))
const Projects   = defineAsyncComponent(() => import('./components/Projects.vue'))
const Experience = defineAsyncComponent(() => import('./components/Experience.vue'))
const Services   = defineAsyncComponent(() => import('./components/Services.vue'))
const Contact    = defineAsyncComponent(() => import('./components/Contact.vue'))
const Footer     = defineAsyncComponent(() => import('./components/Footer.vue'))

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)
})

provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>

<template>
  <div>
    <WelcomeIntro />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Contact />
    </main>
    <Footer />
  </div>
</template>
