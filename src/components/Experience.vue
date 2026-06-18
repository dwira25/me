<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../composables/usePerformanceMode.js'
import { useI18n } from '../composables/useI18n.js'

gsap.registerPlugin(ScrollTrigger)

const { lang, t } = useI18n()

const rawExperiences = [
  {
    role: 'AI Agent & MCP Developer',
    period: '2024 — Skrg',
    desc:   'Merancang AI agent pipeline dengan LLM, MCP server, dan 3D web integration.',
    descEn: 'Designing AI agent pipelines with LLM, MCP server, and 3D web integration.',
    tags: ['MCP', 'Claude API', 'RAG', 'Three.js'],
    category: 'ai',
  },
  {
    role: 'IT Project Manager / PMO',
    period: '2022 — Skrg',
    desc:   'Mengelola timeline, dashboard reporting, dan visibility multi-project untuk stakeholder.',
    descEn: 'Managing timelines, dashboard reporting, and multi-project visibility for stakeholders.',
    tags: ['ClickUp', 'PMO', 'Agile', 'Roadmap'],
    category: 'pm',
  },
  {
    role: 'Product & Workflow Builder',
    period: '2021 — Skrg',
    desc:   'Workflow automation, AI Workspace berbasis RAG, integrasi API antar sistem.',
    descEn: 'Workflow automation, RAG-based AI Workspace, and API integration between systems.',
    tags: ['n8n', 'API Integration', 'AI Workspace'],
    category: 'build',
  },
  {
    role: 'QA & System Analyst',
    period: '2020 — 2021',
    desc:   'Requirement, dokumentasi sistem, QA, dan UAT sebelum rilis.',
    descEn: 'Requirements, system documentation, QA, and UAT before release.',
    tags: ['QA', 'UAT', 'BRD', 'System Analysis'],
    category: 'qa',
  },
  {
    role: 'IT Infrastructure / NOC',
    period: '2018 — 2020',
    desc:   'Monitoring server dan jaringan, troubleshooting infrastruktur IT.',
    descEn: 'Server and network monitoring, IT infrastructure troubleshooting.',
    tags: ['Network', 'Linux', 'Monitoring'],
    category: 'infra',
  },
]

const ACCENTS = ['var(--c-violet)', 'var(--c-blue)', 'var(--c-cyan)', 'var(--c-blue)', 'var(--c-cyan)']

const experiences = computed(() =>
  rawExperiences.map(e => ({
    ...e,
    period: e.period.replace('Skrg', t('exp.now')),
    desc:   lang.value === 'en' ? e.descEn : e.desc,
  }))
)

const activeIndex = ref(-1)
const railRef = ref(null)
const triggers = ref([])

onMounted(() => {
  if (prefersReducedMotion()) return
  nextTick(() => {
    document.querySelectorAll('.exp-item').forEach((el, i) => {
      triggers.value.push(ScrollTrigger.create({
        trigger: el, start: 'top 65%', end: 'bottom 35%',
        onEnter: () => { activeIndex.value = i },
        onLeave: () => { if (activeIndex.value === i) activeIndex.value = -1 },
        onEnterBack: () => { activeIndex.value = i },
        onLeaveBack: () => { if (activeIndex.value === i) activeIndex.value = -1 },
      }))
    })

    if (railRef.value) {
      triggers.value.push(ScrollTrigger.create({
        trigger: railRef.value, start: 'top 75%', end: 'bottom 25%', scrub: true,
        onUpdate: (self) => railRef.value.style.setProperty('--rail-fill', self.progress),
      }))
    }
  })
})
onUnmounted(() => triggers.value.forEach(tr => tr.kill()))
</script>

<template>
  <section id="experience" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <div v-reveal class="section-kicker mb-6">
        <span class="section-kicker-dot" aria-hidden="true" />
        {{ t('exp.label') }}
      </div>
      <h2 v-reveal="{ delay: 80 }" class="text-2xl font-semibold tracking-tight mb-10" style="color: var(--text)">
        {{ t('exp.heading') }}
      </h2>

      <ol ref="railRef" class="timeline-rail space-y-2">
        <li
          v-for="(exp, i) in experiences"
          :key="exp.role"
          v-reveal="{ delay: i * 60 }"
          class="exp-item group rounded-2xl transition-all duration-300"
          :class="{ 'is-active': activeIndex === i }"
          :style="{
            '--card-accent': ACCENTS[i % ACCENTS.length],
            '--marker-top': '2.1rem',
            background: activeIndex === i ? 'var(--bg-secondary)' : 'transparent',
            padding: '1.25rem 1.25rem 1.25rem 0.25rem',
          }"
        >
          <span class="timeline-marker" aria-hidden="true" />

          <div class="flex items-start gap-3">
            <span class="icon-badge mt-0.5">
              <svg v-if="exp.category === 'ai'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><rect x="8" y="8" width="8" height="8" rx="2" />
              </svg>
              <svg v-else-if="exp.category === 'pm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="3" width="12" height="4" rx="1" /><rect x="4" y="7" width="16" height="14" rx="2" /><path d="M9 13l2 2 4-4" />
              </svg>
              <svg v-else-if="exp.category === 'build'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a4 4 0 10-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 105.4-5.4z" />
              </svg>
              <svg v-else-if="exp.category === 'qa'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.2 2.2L16 9.5" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" />
              </svg>
            </span>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 class="text-base font-semibold transition-colors duration-200"
                  :style="{ color: activeIndex === i ? 'var(--card-accent)' : 'var(--text)' }">
                  {{ exp.role }}
                </h3>
                <span class="text-xs font-mono" style="color: var(--text-3)">{{ exp.period }}</span>
              </div>
              <p class="text-sm leading-relaxed mb-3" style="color: var(--text-2)">{{ exp.desc }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </li>
      </ol>

    </div>
  </section>
</template>
