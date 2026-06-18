<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount, provide, defineAsyncComponent } from 'vue'
import Navbar from './components/Navbar.vue'
import WelcomeIntro from './components/WelcomeIntro.vue'
import {
  prefersReducedData,
  prefersReducedMotion,
  isCoarsePointer,
  shouldUseLiteMode,
} from './composables/usePerformanceMode.js'
import { safeLocalStorageGet, safeLocalStorageSet } from './composables/useSafeStorage.js'

const Hero = defineAsyncComponent(() => import('./components/Hero.vue'))
const SectionSkeleton = defineAsyncComponent(() => import('./components/SectionSkeleton.vue'))
const About      = defineAsyncComponent(() => import('./components/About.vue'))
const Skills     = defineAsyncComponent(() => import('./components/Skills.vue'))
const Projects   = defineAsyncComponent(() => import('./components/Projects.vue'))
const Experience = defineAsyncComponent(() => import('./components/Experience.vue'))
const Services   = defineAsyncComponent(() => import('./components/Services.vue'))
const Contact    = defineAsyncComponent(() => import('./components/Contact.vue'))
const Footer     = defineAsyncComponent(() => import('./components/Footer.vue'))

const isDark = ref(false)
const liteMode = ref(shouldUseLiteMode())
const fullPortfolioLoaded = ref(!liteMode.value)
const ready = reactive({
  about: false,
  skills: false,
  projects: false,
  experience: false,
  services: false,
  contact: false,
  footer: false,
})

const sentinels = {
  about: ref(null),
  skills: ref(null),
  projects: ref(null),
  experience: ref(null),
  services: ref(null),
  contact: ref(null),
  footer: ref(null),
}

const observers = []
const shouldRenderPortfolio = computed(() => !liteMode.value || fullPortfolioLoaded.value)
const shouldRenderFullHero = computed(() => !liteMode.value || fullPortfolioLoaded.value)
const portfolioObserversReady = ref(false)
let mobileAutoLoadTimer = null

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  safeLocalStorageSet('theme', isDark.value ? 'dark' : 'light')
}

function markWhenNear(key, rootMargin = '280px 0px') {
  const el = sentinels[key].value
  if (!el) return

  if (typeof IntersectionObserver === 'undefined') {
    ready[key] = true
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        ready[key] = true
        observer.disconnect()
      }
    },
    { rootMargin, threshold: 0 }
  )

  observer.observe(el)
  observers.push(observer)
}

function setSentinel(key, el) {
  sentinels[key].value = el
}

function loadFullPortfolio() {
  if (mobileAutoLoadTimer != null) {
    clearTimeout(mobileAutoLoadTimer)
    mobileAutoLoadTimer = null
  }

  liteMode.value = false
  fullPortfolioLoaded.value = true
}

function initPortfolioObservers() {
  if (portfolioObserversReady.value || !shouldRenderPortfolio.value) return

  portfolioObserversReady.value = true

  if (typeof IntersectionObserver === 'undefined') {
    Object.keys(ready).forEach((key) => {
      ready[key] = true
    })
    return
  }

  markWhenNear('about', '360px 0px')
  markWhenNear('skills', '360px 0px')
  markWhenNear('projects', '360px 0px')
  markWhenNear('experience', '320px 0px')
  markWhenNear('services', '320px 0px')
  markWhenNear('contact', '260px 0px')
  markWhenNear('footer', '160px 0px')
}

onMounted(() => {
  const saved = safeLocalStorageGet('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)

  if (liteMode.value && !isCoarsePointer() && window.innerWidth >= 1024 && !prefersReducedMotion() && !prefersReducedData()) {
    mobileAutoLoadTimer = window.setTimeout(() => {
      loadFullPortfolio()
    }, 1200)
  }
})

watch(shouldRenderPortfolio, async (shouldRender) => {
  if (!shouldRender) return

  await nextTick()
  initPortfolioObservers()
}, { immediate: true })

onBeforeUnmount(() => {
  if (mobileAutoLoadTimer != null) {
    clearTimeout(mobileAutoLoadTimer)
    mobileAutoLoadTimer = null
  }
  observers.forEach((observer) => observer.disconnect())
  observers.length = 0
})

provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>

<template>
  <div>
    <WelcomeIntro />
    <Navbar />
    <main>
      <Hero v-if="shouldRenderFullHero" />
      <section v-else class="lite-hero">
        <div class="lite-hero-inner">
          <div class="lite-hero-backdrop" aria-hidden="true" />
          <div class="lite-hero-topline">
            <p class="lite-gate-kicker">Portfolio</p>
            <span class="lite-status">Fast mode</span>
          </div>
          <div class="lite-hero-robot" aria-hidden="true">
            <div class="lite-robot-shell">
              <span class="lite-robot-halo" />
              <span class="lite-robot-antenna" />
              <span class="lite-robot-head">
                <span class="lite-robot-eye" />
                <span class="lite-robot-eye" />
              </span>
              <span class="lite-robot-mouth" />
              <span class="lite-robot-body">
                <span class="lite-robot-panel" />
                <span class="lite-robot-arm left" />
                <span class="lite-robot-arm right" />
                <span class="lite-robot-leg left" />
                <span class="lite-robot-leg right" />
              </span>
            </div>
          </div>
          <h1 class="lite-hero-title">Dwira Naufal</h1>
          <h2 class="lite-hero-title lite-hero-title--accent">Siregar</h2>
          <p class="lite-hero-copy">
            IT Project Manager, PMO, ClickUp Consultant, dan AI Workspace Builder.
          </p>
          <div class="lite-pill-row" aria-hidden="true">
            <span class="lite-pill">PMO</span>
            <span class="lite-pill">ClickUp</span>
            <span class="lite-pill">AI Ops</span>
            <span class="lite-pill">Workflow</span>
          </div>
          <div class="lite-hero-grid">
            <article class="lite-metric">
              <span class="lite-metric-value">40+</span>
              <span class="lite-metric-label">Sistem dibangun</span>
            </article>
            <article class="lite-metric">
              <span class="lite-metric-value">2018</span>
              <span class="lite-metric-label">Mulai kerja profesional</span>
            </article>
            <article class="lite-metric">
              <span class="lite-metric-value">AI</span>
              <span class="lite-metric-label">Workspace & automasi</span>
            </article>
          </div>
          <div class="lite-hero-actions">
            <button type="button" class="lite-gate-button primary" @click="loadFullPortfolio">
              Muat versi lengkap
            </button>
            <a href="#contact" class="lite-gate-button secondary">Hubungi Saya</a>
          </div>
        </div>
      </section>
      <template v-if="shouldRenderPortfolio">
        <div :ref="(el) => setSentinel('about', el)" class="lazy-sentinel" aria-hidden="true" />
        <template v-if="ready.about">
          <About />
        </template>
        <template v-else>
          <SectionSkeleton variant="text" />
        </template>

        <div :ref="(el) => setSentinel('skills', el)" class="lazy-sentinel" aria-hidden="true" />
        <template v-if="ready.skills">
          <Skills />
        </template>
        <template v-else>
          <SectionSkeleton variant="grid" />
        </template>

        <div :ref="(el) => setSentinel('projects', el)" class="lazy-sentinel" aria-hidden="true" />
        <template v-if="ready.projects">
          <Projects />
        </template>
        <template v-else>
          <SectionSkeleton variant="grid" />
        </template>

        <div :ref="(el) => setSentinel('experience', el)" class="lazy-sentinel" aria-hidden="true" />
        <template v-if="ready.experience">
          <Experience />
        </template>
        <template v-else>
          <SectionSkeleton variant="text" />
        </template>

        <div :ref="(el) => setSentinel('services', el)" class="lazy-sentinel" aria-hidden="true" />
        <template v-if="ready.services">
          <Services />
        </template>
        <template v-else>
          <SectionSkeleton variant="text" />
        </template>

        <div :ref="(el) => setSentinel('contact', el)" class="lazy-sentinel" aria-hidden="true" />
        <template v-if="ready.contact">
          <Contact />
        </template>
        <template v-else>
          <SectionSkeleton variant="contact" />
        </template>
      </template>
    </main>
    <template v-if="shouldRenderPortfolio">
      <div :ref="(el) => setSentinel('footer', el)" class="lazy-sentinel" aria-hidden="true" />
      <Footer v-if="ready.footer" />
    </template>
  </div>
</template>
