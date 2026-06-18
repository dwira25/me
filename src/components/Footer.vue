<script setup>
import { prefersReducedMotion } from '../composables/usePerformanceMode.js'

const year = new Date().getFullYear()
const email = 'dwiranaufal1999@gmail.com'
const linkedin = 'https://www.linkedin.com/in/dwiranaufalsiregar/'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="footer-shell py-8">
    <div class="mx-auto max-w-3xl px-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <span class="text-sm font-semibold tracking-tight" style="color: var(--text)">DNS</span>
        <p class="text-xs font-mono mt-0.5" style="color: var(--text-3)">© {{ year }} Dwira Naufal Siregar</p>
      </div>

      <div class="flex items-center gap-5">
        <a :href="`mailto:${email}`" class="footer-link">Email</a>
        <a :href="linkedin" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
        <button type="button" class="back-to-top" aria-label="Kembali ke atas" @click="scrollToTop">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  </footer>
</template>
