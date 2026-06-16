<script setup>
import { computed } from 'vue'
import SectionHeading from './ui/SectionHeading.vue'
import FloatingOrb from './FloatingOrb.vue'

const orbSize = computed(() => (window.innerWidth < 640 ? 180 : 220))

const journey = [
  { year: '2018', title: 'NOC & IT Infrastructure', desc: 'Mengawali karier menjaga stabilitas sistem dan jaringan.' },
  { year: '2020', title: 'QA & System Analyst', desc: 'Menjembatani kebutuhan bisnis dengan implementasi sistem.' },
  { year: '2022 — Sekarang', title: 'IT Project Manager / PMO', desc: 'Mengelola timeline, dashboard, dan visibility multi-project.' },
]
</script>

<template>
  <section id="about" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
        <div v-reveal>
          <SectionHeading
            eyebrow="About Me"
            title="Merapikan proses kerja, satu sistem pada satu waktu"
          />

          <div class="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg">
            <p>
              Saya adalah <span class="font-semibold text-slate-200">IT Project Manager / PMO</span> dengan pengalaman
              di bidang IT sejak 2018, mulai dari NOC, IT Infrastructure, QA, System Analyst, hingga Project
              Management.
            </p>
            <p>
              Saya fokus membantu bisnis merapikan proses kerja, meningkatkan visibility project, dan membangun
              sistem digital yang mudah digunakan oleh user — dari workspace ClickUp hingga AI Workspace berbasis
              data internal perusahaan.
            </p>
          </div>

          <div class="mt-10 flex flex-wrap gap-3">
            <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Sejak 2018 di bidang IT
            </span>
            <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Fokus PMO &amp; Workflow
            </span>
            <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Berbasis Jakarta
            </span>
          </div>
        </div>

        <div v-reveal="{ delay: 120 }" class="glass-panel rounded-3xl p-8 shadow-card flex flex-col items-center">
          <!-- Floating 3D Orb — satu instance, size computed -->
          <div class="mb-6 flex justify-center">
            <FloatingOrb :size="orbSize" />
          </div>
          <p class="section-label">Career Journey</p>
          <ol class="relative mt-8 space-y-8 border-l border-white/10 pl-8">
            <li v-for="step in journey" :key="step.title" class="relative">
              <span
                class="absolute -left-[2.35rem] flex h-4 w-4 items-center justify-center rounded-full border-2 border-navy-900 bg-gradient-to-br from-accent-cyan to-accent-violet shadow-glow"
              ></span>
              <p class="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">{{ step.year }}</p>
              <p class="mt-1.5 font-display text-lg font-semibold text-white">{{ step.title }}</p>
              <p class="mt-1 text-sm leading-relaxed text-slate-400">{{ step.desc }}</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
