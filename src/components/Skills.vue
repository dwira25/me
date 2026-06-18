<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { shouldUseHeroScene } from '../composables/usePerformanceMode.js'

const FloatingOrb = defineAsyncComponent(() => import('./FloatingOrb.vue'))

const { t } = useI18n()
const useFloatingOrb = shouldUseHeroScene()

const ACCENTS = ['var(--c-cyan)', 'var(--c-blue)', 'var(--c-violet)']

const groups = computed(() => [
  {
    label: t('skills.g1'),
    icon: 'pm',
    skills: ['Project Management', 'PMO', 'ClickUp Implementation', 'Roadmap & Timeline', 'Stakeholder Management', 'Agile / Scrum'],
  },
  {
    label: t('skills.g2'),
    icon: 'systems',
    skills: ['ERP System', 'WMS / TMS', 'API Integration', 'Workflow Automation', 'System Analysis', 'QA & UAT'],
  },
  {
    label: t('skills.g3'),
    icon: 'ai',
    skills: ['AI Workspace & RAG', 'AI Agent Builder', 'MCP Server', 'Claude / GPT / Gemini API', 'Prompt Engineering', 'Three.js / Spline 3D'],
  },
])
</script>

<template>
  <section id="skills" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <div v-reveal class="section-kicker">
        <span class="section-kicker-dot" aria-hidden="true" />
        {{ t('skills.label') }}
      </div>
      <h2 v-reveal="{ delay: 60 }" class="text-2xl font-semibold tracking-tight mt-4 mb-3 max-w-lg" style="color: var(--text)">
        {{ t('skills.heading') }}
      </h2>
      <p v-reveal="{ delay: 100 }" class="section-sub mb-10">{{ t('skills.sub') }}</p>

      <!-- AI-core orbit stage: FloatingOrb (Three.js) with orbiting MCP/RAG/LLM chips -->
      <div v-reveal="{ delay: 120 }" class="orbit-stage" aria-hidden="true">
        <template v-if="useFloatingOrb">
          <div class="orbit-ring orbit-ring--3"><span class="orbit-chip">LLM Agent</span></div>
          <div class="orbit-ring orbit-ring--2"><span class="orbit-chip">RAG</span></div>
          <div class="orbit-ring orbit-ring--1"><span class="orbit-chip">MCP</span></div>
          <div class="orbit-core">
            <FloatingOrb :size="120" />
          </div>
        </template>
        <div v-else class="orbit-static">
          <div class="orbit-static-core" />
          <div class="orbit-static-chip">LLM</div>
          <div class="orbit-static-chip orbit-static-chip--alt">RAG</div>
          <div class="orbit-static-chip orbit-static-chip--third">MCP</div>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="(group, i) in groups"
          :key="group.label"
          v-reveal="{ delay: i * 70 }"
          v-tilt
          class="bento-card has-glow tilt-card"
          :style="{ '--card-accent': ACCENTS[i % 3] }"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="icon-badge">
              <svg v-if="group.icon === 'pm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="3" width="12" height="4" rx="1" /><rect x="4" y="7" width="16" height="14" rx="2" /><path d="M9 13l2 2 4-4" />
              </svg>
              <svg v-else-if="group.icon === 'systems'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01M12 10v4" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                <rect x="8" y="8" width="8" height="8" rx="2" />
              </svg>
            </span>
            <p class="text-sm font-semibold" style="color: var(--text)">{{ group.label }}</p>
          </div>

          <div class="skill-chip-row">
            <span v-for="skill in group.skills" :key="skill" class="skill-chip">{{ skill }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
