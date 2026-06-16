<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 16
}

function closeMenu() {
  isMenuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass-panel shadow-card' : 'bg-transparent'"
  >
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8" aria-label="Main navigation">
      <a href="#home" class="group font-display text-xl font-bold tracking-tight text-white">
        Dwira<span class="gradient-text-animated animate-gradient-x inline-block transition-transform duration-300 group-hover:rotate-180">.</span>
      </a>

      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="nav-link text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-accent-cyan"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a
        href="#contact"
        class="btn-shimmer hidden rounded-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet px-5 py-2 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 md:inline-block"
      >
        Hubungi Saya
      </a>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 md:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" id="mobile-menu" class="glass-panel border-t border-white/5 md:hidden">
        <ul class="flex flex-col gap-1 px-6 py-4">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-150 hover:bg-white/5 hover:text-accent-cyan"
              @click="closeMenu"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="pt-2">
            <a
              href="#contact"
              class="block rounded-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet px-4 py-2.5 text-center text-sm font-semibold text-navy-950"
              @click="closeMenu"
            >
              Hubungi Saya
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
