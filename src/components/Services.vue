<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
const { lang, t } = useI18n()

const rawServices = [
  { title: 'ClickUp Workspace Setup',
    desc:   'Konfigurasi workspace, space, custom field, dan task workflow sesuai struktur tim.',
    descEn: 'Configure workspace, spaces, custom fields, and task workflows per team structure.' },
  { title: 'Workflow & SOP Digitalization',
    desc:   'Mengubah SOP manual menjadi workflow digital yang terstruktur.',
    descEn: 'Transform manual SOPs into structured digital workflows.' },
  { title: 'Project Management Dashboard',
    desc:   'Dashboard timeline, status, dan reporting untuk visibility seluruh project.',
    descEn: 'Timeline, status, and reporting dashboard for full project visibility.' },
  { title: 'ERP / WMS / TMS Planning',
    desc:   'Perencanaan kebutuhan sistem ERP, warehouse, dan transport management.',
    descEn: 'Planning for ERP, warehouse, and transport management system requirements.' },
  { title: 'API Integration Planning',
    desc:   'Merancang alur integrasi API antar sistem internal dan pihak ketiga.',
    descEn: 'Designing API integration flows between internal systems and third parties.' },
  { title: 'AI Workspace & RAG',
    desc:   'Implementasi AI workspace dengan knowledge base berbasis data internal.',
    descEn: 'Implementing AI workspace with knowledge base built on internal data.' },
  { title: 'QA, UAT & Delivery',
    desc:   'Memastikan kualitas sistem melalui testing dan acceptance sebelum go-live.',
    descEn: 'Ensuring system quality through testing and acceptance before go-live.' },
  { title: 'AI Agent Development',
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

      <p v-reveal class="text-xs font-mono mb-6" style="color: var(--text-3)">{{ t('services.label') }}</p>
      <h2 v-reveal="{ delay: 80 }" class="text-2xl font-semibold tracking-tight mb-8" style="color: var(--text)">
        {{ t('services.heading') }}
      </h2>

      <div class="grid gap-0 md:grid-cols-2 border border-t-0 border-l-0" style="border-color: var(--border)">
        <div
          v-for="(s, i) in services"
          :key="s.title"
          v-reveal="{ delay: (i % 2) * 50 }"
          class="border-t border-l p-5 group hover:bg-[color:var(--bg-secondary)] transition-colors duration-200 cursor-default"
          :style="{ borderColor: 'var(--border)' }"
        >
          <p class="text-xs font-mono mb-2" style="color: var(--text-3)">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="text-sm font-semibold mb-1.5 group-hover:text-[color:var(--accent)] transition-colors duration-200"
            style="color: var(--text)">{{ s.title }}</h3>
          <p class="text-xs leading-relaxed" style="color: var(--text-2)">{{ s.desc }}</p>
        </div>
      </div>

    </div>
  </section>
</template>
