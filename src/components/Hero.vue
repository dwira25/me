<script setup>
import ThreeBackground from './ThreeBackground.vue'
const focusAreas = ['Project Manager Officer', 'ClickUp Implementation', 'Workflow Automation', 'AI Workspace & RAG']
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden bg-grid-pattern bg-grid pt-28 pb-20 sm:pt-32"
  >
    <ThreeBackground />
    <div class="absolute inset-0 bg-hero-glow"></div>
    <div
      class="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] bg-accent-violet/20 blur-3xl animate-blob"
      aria-hidden="true"
    ></div>
    <div
      class="absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-accent-cyan/15 blur-3xl animate-float-slow"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8">
      <div v-reveal>
        <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-cyan sm:px-4 sm:text-xs sm:tracking-[0.2em]">
          IT Project Manager Officer &middot; ClickUp Consultant - AI Agent Builder
        </span>

        <h1 class="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Dwira Naufal
          <span class="block pb-2 gradient-text-animated animate-gradient-x">Siregar</span>
        </h1>

        <p class="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-lg">
          IT Project Manager &amp; ClickUp Consultant | Workflow Automation, AI Workspace, ERP/WMS/TMS &amp; API
          Integration for Business Operations.
        </p>

        <p class="mt-3 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-base">
          Saya membantu tim dan perusahaan membangun sistem kerja yang lebih rapi, terukur, dan mudah digunakan
          mulai dari implementasi ClickUp, workflow automation, integrasi API, ERP, WMS/TMS, hingga pengembangan AI
          Workspace berbasis data internal.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            class="btn-shimmer rounded-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet px-6 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_50px_-8px_rgba(34,211,238,0.5)]"
          >
            Lihat Project
          </a>
          <a
            href="#contact"
            class="btn-shimmer rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent-cyan/50 hover:bg-white/10"
          >
            Hubungi Saya
          </a>
        </div>

        <dl class="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
          <div>
            <dt class="font-display text-xl font-bold text-white sm:text-3xl">2018</dt>
            <dd class="mt-1 text-[10px] text-slate-500 sm:text-sm">Berkarier di bidang IT</dd>
          </div>
          <div>
            <dt class="font-display text-xl font-bold text-white sm:text-3xl">40+</dt>
            <dd class="mt-1 text-[10px] text-slate-500 sm:text-sm">Sistem &amp; platform dibangun</dd>
          </div>
          <div>
            <dt class="font-display text-xl font-bold text-white sm:text-3xl">PMO</dt>
            <dd class="mt-1 text-[10px] text-slate-500 sm:text-sm">Fokus disiplin &amp; visibility</dd>
          </div>
        </dl>
      </div>

      <div v-reveal="{ delay: 150 }" class="relative mx-auto w-full max-w-md">
        <div v-tilt class="gradient-border glass-panel relative rounded-3xl p-6 shadow-card sm:p-8">
          <div class="flex items-center gap-3 sm:gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan via-accent-blue to-accent-violet font-display text-base font-bold text-navy-950 transition-transform duration-300 hover:rotate-6 hover:scale-105 sm:h-16 sm:w-16 sm:text-xl"
            >
              DNS
            </div>
            <div>
              <p class="font-display text-base font-semibold text-white sm:text-lg">Dwira Naufal Siregar</p>
              <p class="text-xs text-slate-400 sm:text-sm">IT Project Manager / PMO</p>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fokus Saat Ini</p>
            <ul class="space-y-2">
              <li
                v-for="area in focusAreas"
                :key="area"
                class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-xs text-slate-300 transition-colors duration-200 hover:border-accent-cyan/30 hover:bg-white/[0.06] sm:px-4 sm:py-3 sm:text-sm"
              >
                <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan"></span>
                {{ area }}
              </li>
            </ul>
          </div>

          <div class="mt-6 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 sm:mt-8 sm:px-4 sm:py-3">
            <span class="text-xs text-slate-400">Availability</span>
            <span class="flex items-center gap-2 text-xs font-semibold text-accent-cyan">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full rounded-full bg-accent-cyan shadow-glow animate-glow-pulse"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan"></span>
              </span>
              Open for collaboration
            </span>
          </div>
        </div>

        <div
          class="glass-panel absolute -bottom-8 -left-6 hidden w-44 rounded-2xl p-4 shadow-card animate-float sm:block"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent-violet">ClickUp Setup</p>
          <p class="mt-2 text-xs text-slate-300">Workspace, dashboard &amp; reporting siap pakai</p>
        </div>
      </div>
    </div>
  </section>
</template>
