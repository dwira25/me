<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
const { lang, t } = useI18n()

const ACCENTS = ['var(--c-cyan)', 'var(--c-blue)', 'var(--c-violet)']

const rawServices = [
  { title: 'ClickUp Workspace Setup', icon: 'layout',
    desc:   'Konfigurasi workspace, space, custom field, dan task workflow sesuai struktur tim.',
    descEn: 'Configure workspace, spaces, custom fields, and task workflows per team structure.' },
  { title: 'Workflow & SOP Digitalization', icon: 'flow',
    desc:   'Mengubah SOP manual menjadi workflow digital yang terstruktur.',
    descEn: 'Transform manual SOPs into structured digital workflows.' },
  { title: 'Project Management Dashboard', icon: 'dashboard',
    desc:   'Dashboard timeline, status, dan reporting untuk visibility seluruh project.',
    descEn: 'Timeline, status, and reporting dashboard for full project visibility.' },
  { title: 'ERP / WMS / TMS Planning', icon: 'server',
    desc:   'Perencanaan kebutuhan sistem ERP, warehouse, dan transport management.',
    descEn: 'Planning for ERP, warehouse, and transport management system requirements.' },
  { title: 'API Integration Planning', icon: 'link',
    desc:   'Merancang alur integrasi API antar sistem internal dan pihak ketiga.',
    descEn: 'Designing API integration flows between internal systems and third parties.' },
  { title: 'AI Workspace & RAG', icon: 'ai',
    desc:   'Implementasi AI workspace dengan knowledge base berbasis data internal.',
    descEn: 'Implementing AI workspace with knowledge base built on internal data.' },
  { title: 'QA, UAT & Delivery', icon: 'check',
    desc:   'Memastikan kualitas sistem melalui testing dan acceptance sebelum go-live.',
    descEn: 'Ensuring system quality through testing and acceptance before go-live.' },
  { title: 'AI Agent Development', icon: 'bot',
    desc:   'Merancang AI agent dengan tool calling, MCP, dan multi-LLM untuk otomasi cerdas.',
    descEn: 'Designing AI agents with tool calling, MCP, and multi-LLM for intelligent automation.' },
]

const services = computed(() =>
  rawServices.map(s => ({ ...s, desc: lang.value === 'en' ? s.descEn : s.desc }))
)
</script>

<template>
  <section id="services" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <div v-reveal class="section-kicker mb-6">
        <span class="section-kicker-dot" aria-hidden="true" />
        {{ t('services.label') }}
      </div>
      <h2 v-reveal="{ delay: 80 }" class="text-2xl font-semibold tracking-tight mb-3" style="color: var(--text)">
        {{ t('services.heading') }}
      </h2>
      <p v-reveal="{ delay: 100 }" class="section-sub mb-10">{{ t('services.sub') }}</p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="(s, i) in services"
          :key="s.title"
          v-reveal="{ delay: (i % 2) * 50 }"
          v-tilt
          class="bento-card tilt-card"
          :style="{ '--card-accent': ACCENTS[i % 3] }"
        >
          <div class="flex items-start justify-between gap-3 mb-3">
            <span class="icon-badge">
              <svg v-if="s.icon === 'layout'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
              </svg>
              <svg v-else-if="s.icon === 'flow'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="6" height="5" rx="1.2" /><rect x="15" y="15" width="6" height="5" rx="1.2" /><path d="M6 9v3a3 3 0 003 3h3M15 17h-3a3 3 0 01-3-3" />
              </svg>
              <svg v-else-if="s.icon === 'dashboard'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19V10M11 19V5M18 19v-6" />
              </svg>
              <svg v-else-if="s.icon === 'server'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" />
              </svg>
              <svg v-else-if="s.icon === 'link'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 15l6-6M10 7l1.5-1.5a3.5 3.5 0 115 5L15 12M14 17l-1.5 1.5a3.5 3.5 0 11-5-5L9 12" />
              </svg>
              <svg v-else-if="s.icon === 'ai'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><rect x="8" y="8" width="8" height="8" rx="2" />
              </svg>
              <svg v-else-if="s.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.2 2.2L16 9.5" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="9" width="14" height="11" rx="2" /><path d="M12 9V5M9 5h6M9 14h.01M15 14h.01" />
              </svg>
            </span>
            <p class="text-xs font-mono" style="color: var(--text-3)">{{ String(i + 1).padStart(2, '0') }}</p>
          </div>
          <h3 class="text-sm font-semibold mb-1.5" style="color: var(--text)">{{ s.title }}</h3>
          <p class="text-xs leading-relaxed" style="color: var(--text-2)">{{ s.desc }}</p>
        </div>
      </div>

    </div>
  </section>
</template>
