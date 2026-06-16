<script setup>
import SectionHeading from './ui/SectionHeading.vue'

const experiences = [
  {
    role: 'AI Agent & MCP Developer',
    period: '2024 — Sekarang',
    desc: 'Merancang dan membangun AI agent pipeline dengan LLM, MCP server, dan 3D web integration.',
    points: [
      'Membangun MCP server untuk Spline, Three.js, Figma, GitHub',
      'Merancang AI agent pipeline multi-tool dengan Claude/GPT',
      'Integrasi Three.js & Spline 3D ke dalam aplikasi Vue/React',
      'Prompt engineering dan RAG untuk AI workspace internal',
    ],
    tags: ['MCP', 'Claude API', 'Three.js', 'Spline', 'AI Agent', 'RAG'],
  },
  {
    role: 'IT Project Manager / PMO',
    period: '2022 — Sekarang',
    desc: 'Mengelola perencanaan, eksekusi, dan monitoring multi-project dengan fokus pada visibility dan delivery.',
    points: [
      'Menyusun timeline & roadmap project',
      'Membangun dashboard reporting untuk stakeholder',
      'Mengelola workspace ClickUp untuk seluruh tim',
      'Memastikan delivery tepat waktu dan sesuai scope',
    ],
    tags: ['ClickUp', 'PMO', 'Roadmap', 'Stakeholder Management', 'Agile'],
  },
  {
    role: 'Product & Workflow Builder',
    period: '2021 — Sekarang',
    desc: 'Membangun dan mengembangkan workflow digital serta produk internal berbasis AI.',
    points: [
      'Merancang workflow automation antar tools',
      'Mengembangkan AI Workspace berbasis RAG',
      'Integrasi API antar sistem internal',
      'Continuous improvement proses kerja tim',
    ],
    tags: ['Workflow Automation', 'API Integration', 'RAG', 'AI Workspace', 'n8n'],
  },
  {
    role: 'QA & System Analyst',
    period: '2020 — 2021',
    desc: 'Menjembatani kebutuhan bisnis dengan tim development melalui analisis dan pengujian sistem.',
    points: [
      'Menyusun requirement & dokumentasi sistem',
      'Melakukan QA dan UAT sebelum rilis',
      'Identifikasi bug dan validasi perbaikan',
      'Koordinasi dengan tim development',
    ],
    tags: ['QA', 'UAT', 'BRD', 'System Analysis', 'Documentation'],
  },
  {
    role: 'IT Infrastructure / NOC',
    period: '2018 — 2020',
    desc: 'Mengelola infrastruktur jaringan dan sistem untuk memastikan operasional berjalan stabil.',
    points: [
      'Monitoring & maintenance server dan jaringan',
      'Troubleshooting infrastruktur IT',
      'Dokumentasi konfigurasi sistem',
      'Implementasi standar keamanan dasar',
    ],
    tags: ['Network', 'Server', 'Monitoring', 'IT Security', 'Linux'],
  },
]
</script>

<template>
  <section id="experience" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="Perjalanan karier di bidang IT &amp; Project Management"
        subtitle="Empat fase yang membentuk cara saya melihat sistem, proses, dan kebutuhan tim."
      />

      <ol class="relative space-y-10 border-l border-white/10 pl-8 sm:pl-10">
        <li v-for="(exp, index) in experiences" :key="exp.role" v-reveal="{ delay: index * 80 }" class="relative">
          <span
            class="absolute -left-[2.6rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-navy-900 bg-gradient-to-br from-accent-cyan to-accent-violet shadow-glow sm:-left-[3.05rem]"
          ></span>

          <div class="glass-panel rounded-2xl p-6 sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h3 class="font-display text-xl font-semibold text-white sm:text-2xl">{{ exp.role }}</h3>
              <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-cyan">
                {{ exp.period }}
              </span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{{ exp.desc }}</p>
            <ul class="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <li v-for="point in exp.points" :key="point" class="flex items-start gap-2.5 text-sm text-slate-300">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan"></span>
                {{ point }}
              </li>
            </ul>
            <!-- Skill tags -->
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in exp.tags"
                :key="tag"
                class="rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-3 py-1 text-xs font-medium text-accent-cyan"
              >{{ tag }}</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
