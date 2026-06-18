<script setup>
import { useI18n } from '../composables/useI18n.js'
const { t } = useI18n()

const journey = [
  { year: '2018–2020', title: 'NOC & IT Infrastructure', desc: 'Server monitoring, network troubleshooting, IT security.' },
  { year: '2020–2022', title: 'QA & System Analyst', desc: 'Business analysis, UAT, system documentation.' },
  { year: '2022–2024', title: 'IT Project Manager / PMO', desc: 'Multi-project timeline, ClickUp workspace, stakeholder reporting.' },
  { year: '2024–Skrg', title: 'AI Agent & Builder', desc: 'LLM pipelines, MCP servers, RAG, AI workspace.' },
]
</script>

<template>
  <section id="about" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <p v-reveal class="text-xs font-mono mb-6" style="color: var(--text-3)">{{ t('about.label') }}</p>

      <div class="grid gap-12 md:grid-cols-2">
        <div v-reveal>
          <h2 class="text-2xl font-semibold tracking-tight mb-4" style="color: var(--text)">
            {{ t('about.heading') }}
          </h2>
          <p class="text-sm leading-relaxed mb-3" style="color: var(--text-2)">
            {{ t('about.p1') }}
          </p>
          <p class="text-sm leading-relaxed" style="color: var(--text-2)">
            {{ t('about.p2') }}
          </p>
          <div class="flex flex-wrap gap-2 mt-5">
            <span class="tag">Jakarta</span>
            <span class="tag">{{ t('about.tag.open') }}</span>
            <span class="tag">{{ t('about.tag.since') }}</span>
          </div>
        </div>

        <div v-reveal="{ delay: 100 }">
          <p class="text-xs font-mono mb-5" style="color: var(--text-3)">{{ t('about.career') }}</p>
          <ol class="space-y-5">
            <li v-for="step in journey" :key="step.title" class="tl-item">
              <p class="text-xs font-mono mb-0.5" style="color: var(--text-3)">{{ step.year }}</p>
              <p class="text-sm font-medium" style="color: var(--text)">{{ step.title }}</p>
              <p class="text-xs leading-relaxed mt-0.5" style="color: var(--text-2)">{{ step.desc }}</p>
            </li>
          </ol>
        </div>
      </div>

    </div>
  </section>
</template>
