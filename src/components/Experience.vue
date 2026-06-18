<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../composables/useScrollAnimations.js'
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
  },
  {
    role: 'IT Project Manager / PMO',
    period: '2022 — Skrg',
    desc:   'Mengelola timeline, dashboard reporting, dan visibility multi-project untuk stakeholder.',
    descEn: 'Managing timelines, dashboard reporting, and multi-project visibility for stakeholders.',
    tags: ['ClickUp', 'PMO', 'Agile', 'Roadmap'],
  },
  {
    role: 'Product & Workflow Builder',
    period: '2021 — Skrg',
    desc:   'Workflow automation, AI Workspace berbasis RAG, integrasi API antar sistem.',
    descEn: 'Workflow automation, RAG-based AI Workspace, and API integration between systems.',
    tags: ['n8n', 'API Integration', 'AI Workspace'],
  },
  {
    role: 'QA & System Analyst',
    period: '2020 — 2021',
    desc:   'Requirement, dokumentasi sistem, QA, dan UAT sebelum rilis.',
    descEn: 'Requirements, system documentation, QA, and UAT before release.',
    tags: ['QA', 'UAT', 'BRD', 'System Analysis'],
  },
  {
    role: 'IT Infrastructure / NOC',
    period: '2018 — 2020',
    desc:   'Monitoring server dan jaringan, troubleshooting infrastruktur IT.',
    descEn: 'Server and network monitoring, IT infrastructure troubleshooting.',
    tags: ['Network', 'Linux', 'Monitoring'],
  },
]

const experiences = computed(() =>
  rawExperiences.map(e => ({
    ...e,
    period: e.period.replace('Skrg', t('exp.now')),
    desc:   lang.value === 'en' ? e.descEn : e.desc,
  }))
)

const activeIndex = ref(-1)
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
  })
})
onUnmounted(() => triggers.value.forEach(t => t.kill()))
</script>

<template>
  <section id="experience" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <p v-reveal class="text-xs font-mono mb-6" style="color: var(--text-3)">{{ t('exp.label') }}</p>
      <h2 v-reveal="{ delay: 80 }" class="text-2xl font-semibold tracking-tight mb-8" style="color: var(--text)">
        {{ t('exp.heading') }}
      </h2>

      <ol class="space-y-0">
        <li
          v-for="(exp, i) in experiences"
          :key="exp.role"
          v-reveal="{ delay: i * 60 }"
          class="exp-item group border-t py-6 transition-colors duration-200"
          :style="{ borderColor: 'var(--border)' }"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <h3 class="text-base font-semibold transition-colors duration-200"
              :style="{ color: activeIndex === i ? 'var(--accent)' : 'var(--text)' }">
              {{ exp.role }}
            </h3>
            <span class="text-xs font-mono" style="color: var(--text-3)">{{ exp.period }}</span>
          </div>
          <p class="text-sm leading-relaxed mb-3" style="color: var(--text-2)">{{ exp.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </li>
      </ol>

    </div>
  </section>
</template>
