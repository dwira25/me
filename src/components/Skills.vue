<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
const { t } = useI18n()

const groups = computed(() => [
  {
    label: t('skills.g1'),
    skills: ['Project Management', 'PMO', 'ClickUp Implementation', 'Roadmap & Timeline', 'Stakeholder Management', 'Agile / Scrum'],
  },
  {
    label: t('skills.g2'),
    skills: ['ERP System', 'WMS / TMS', 'API Integration', 'Workflow Automation', 'System Analysis', 'QA & UAT'],
  },
  {
    label: t('skills.g3'),
    skills: ['AI Workspace & RAG', 'AI Agent Builder', 'MCP Server', 'Claude / GPT / Gemini API', 'Prompt Engineering', 'Three.js / Spline 3D'],
  },
])
</script>

<template>
  <section id="skills" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <p v-reveal class="text-xs font-mono mb-6" style="color: var(--text-3)">{{ t('skills.label') }}</p>

      <div class="grid gap-8 md:grid-cols-3">
        <div v-for="group in groups" :key="group.label" v-reveal>
          <p class="text-xs font-semibold mb-3" style="color: var(--text-3)">{{ group.label }}</p>
          <ul class="space-y-2">
            <li v-for="skill in group.skills" :key="skill"
              class="text-sm flex items-center gap-2 transition-colors duration-150 cursor-default group"
              style="color: var(--text-2)">
              <span class="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150"
                :style="{ background: 'var(--border-strong)' }"
                :class="'group-hover:bg-[var(--accent)]'"
              ></span>
              <span class="group-hover:text-[color:var(--text)] transition-colors duration-150">{{ skill }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>
