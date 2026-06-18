<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const isDark = inject('isDark')
const toggleDark = inject('toggleDark')
const { lang, t, toggleLang } = useI18n()

const links = computed(() => [
  { label: t('nav.about'),      href: '#about' },
  { label: t('nav.projects'),   href: '#projects' },
  { label: t('nav.experience'), href: '#experience' },
  { label: t('nav.contact'),    href: '#contact' },
])

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const scrollProgress = ref(0)

function updateScrollState() {
  const scroll = window.scrollY || document.documentElement.scrollTop || 0
  const limit = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0
  )

  isScrolled.value = scroll > 40
  scrollProgress.value = limit > 0 ? (scroll / limit) * 100 : 0
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', updateScrollState)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', updateScrollState)
})
</script>

<template>
  <!-- Scroll progress bar — fixed at top -->
  <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }" aria-hidden="true"></div>

  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :style="{
      background: isScrolled ? 'var(--bg)' : 'transparent',
      borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
    }"
  >
    <nav class="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
      <a href="#home" class="font-semibold text-sm tracking-tight" style="color: var(--text)">
        Dwira Naufal Siregar
      </a>

      <div class="hidden md:flex items-center gap-6">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link">
          {{ link.label }}
        </a>
        <button @click="toggleLang" class="lang-toggle" :aria-label="lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'">
          <span :class="{ 'lang-active': lang === 'id' }">ID</span>
          <span class="lang-sep">·</span>
          <span :class="{ 'lang-active': lang === 'en' }">EN</span>
        </button>
        <button @click="toggleDark" class="theme-toggle" :aria-label="isDark ? 'Light mode' : 'Dark mode'">
          <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-3 md:hidden">
        <button @click="toggleLang" class="lang-toggle" :aria-label="lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'">
          <span :class="{ 'lang-active': lang === 'id' }">ID</span>
          <span class="lang-sep">·</span>
          <span :class="{ 'lang-active': lang === 'en' }">EN</span>
        </button>
        <button @click="toggleDark" class="theme-toggle">
          <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
        <button @click="isMenuOpen = !isMenuOpen" class="theme-toggle">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!isMenuOpen" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/>
            <path v-else stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMenuOpen" class="md:hidden border-t px-5 py-4 flex flex-col gap-3"
        :style="{ background: 'var(--bg)', borderColor: 'var(--border)' }">
        <a v-for="link in links" :key="link.href" :href="link.href"
          class="text-sm py-1" style="color: var(--text-2)"
          @click="isMenuOpen = false">{{ link.label }}</a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  font-size: 11px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  letter-spacing: 0.06em;
  color: var(--text-3);
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  height: 32px;
}
.lang-toggle:hover {
  border-color: var(--border-strong);
  color: var(--text);
}
.lang-active {
  color: var(--accent);
  font-weight: 600;
}
.lang-sep {
  opacity: 0.35;
}
</style>
