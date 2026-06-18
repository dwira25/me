<script setup>
import { useI18n } from '../composables/useI18n.js'
const { t } = useI18n()

const email = 'dwiranaufal1999@gmail.com'
const linkedin = 'https://www.linkedin.com/in/dwiranaufalsiregar/'
</script>

<template>
  <section id="contact" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">
      <p v-reveal class="text-xs font-mono mb-6" style="color: var(--text-3)">{{ t('contact.label') }}</p>
      <div v-reveal="{ delay: 80 }">
        <h2 class="text-2xl font-semibold tracking-tight mb-3" style="color: var(--text)">
          {{ t('contact.heading') }}
        </h2>
        <p class="text-sm leading-relaxed mb-8 max-w-md" style="color: var(--text-2)">
          {{ t('contact.desc') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a :href="`mailto:${email}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            :style="{ background: 'var(--accent)', color: '#fff' }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
            </svg>
            {{ email }}
          </a>
          <a :href="linkedin" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            :style="{ background: 'var(--bg-secondary)', color: 'var(--text)', border: '1px solid var(--border)' }">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18v-7.5H5.67V18h2.67zM7 9.5a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zM18.34 18v-4.12c0-2.2-1.18-3.23-2.75-3.23a2.37 2.37 0 00-2.15 1.18h-.03V10.5h-2.56c.03.7 0 7.5 0 7.5h2.56v-4.19c0-.22.02-.45.09-.6.2-.45.6-.92 1.32-.92.93 0 1.3.71 1.3 1.74V18h2.56z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
