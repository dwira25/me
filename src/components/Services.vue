<script setup>
import SectionHeading from './ui/SectionHeading.vue'

const services = [
  {
    title: 'ClickUp Workspace Setup',
    desc: 'Konfigurasi workspace, space, dan custom field yang disesuaikan dengan struktur tim Anda.',
  },
  {
    title: 'Workflow & SOP Digitalization',
    desc: 'Mengubah SOP manual menjadi workflow digital yang terstruktur dan mudah diikuti.',
  },
  {
    title: 'Project Management Dashboard',
    desc: 'Dashboard timeline, status, dan reporting untuk visibility seluruh project.',
  },
  {
    title: 'ERP / WMS / TMS Planning',
    desc: 'Perencanaan kebutuhan sistem ERP, warehouse, dan transport management.',
  },
  {
    title: 'API Integration Planning',
    desc: 'Merancang alur integrasi API antar sistem internal dan pihak ketiga.',
  },
  {
    title: 'AI Workspace & RAG Implementation',
    desc: 'Implementasi AI workspace dengan knowledge base berbasis data internal.',
  },
  {
    title: 'QA, UAT, dan Delivery Management',
    desc: 'Memastikan kualitas sistem melalui testing dan acceptance sebelum go-live.',
  },
  {
    title: 'MCP Server Integration',
    desc: 'Setup dan integrasi MCP server (Spline, Three.js, GitHub, Figma, Supabase) untuk memperkuat AI workflow.',
  },
  {
    title: '3D Web Experience (Spline + Three.js)',
    desc: 'Membangun aset dan scene 3D interaktif untuk website atau aplikasi menggunakan Spline dan Three.js.',
  },
  {
    title: 'AI Agent Pipeline Development',
    desc: 'Merancang AI agent dengan tool calling, MCP, dan multi-LLM (Claude, GPT, Gemini) untuk otomasi cerdas.',
  },
]
</script>

<template>
  <section id="services" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Layanan yang bisa saya bantu untuk tim Anda"
        subtitle="Dari setup workspace hingga perencanaan sistem enterprise — disesuaikan dengan kebutuhan operasional bisnis."
      />

      <div class="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid-cols-2">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          v-reveal="{ delay: (index % 2) * 100 }"
          class="group relative bg-navy-900 p-6 transition-colors duration-300 hover:bg-white/[0.04] sm:p-8"
        >
          <span
            class="font-display text-4xl font-extrabold text-white/10 transition-colors duration-300 group-hover:text-accent-cyan/30"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="mt-4 font-display text-lg font-semibold text-white">{{ service.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ service.desc }}</p>
          <div
            class="mt-6 h-px w-full bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/0 to-accent-violet/0 transition-all duration-500 group-hover:from-accent-cyan/60 group-hover:via-accent-blue/40 group-hover:to-accent-violet/0"
          ></div>
        </article>
      </div>
    </div>
  </section>
</template>
