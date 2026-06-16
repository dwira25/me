<script setup>
const email = 'dwiranaufal1999@gmail.com'
const linkedin = 'https://www.linkedin.com/in/dwiranaufalsiregar/'
</script>

<template>
  <section id="contact" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="gradient-border glass-panel relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-card sm:px-12 sm:py-20" v-reveal v-tilt>
        <div class="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-violet/20 blur-3xl" aria-hidden="true"></div>

        <span class="section-label">Contact</span>
        <h2 class="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Mari diskusikan kebutuhan sistem dan workflow tim Anda.
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Terbuka untuk diskusi seputar ClickUp, workflow automation, integrasi API, ERP/WMS/TMS, hingga AI Workspace.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            :href="`mailto:${email}`"
            class="btn-shimmer inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_50px_-8px_rgba(34,211,238,0.5)] sm:w-auto"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M4 6l8 7 8-7" />
            </svg>
            {{ email }}
          </a>

          <a
            :href="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-shimmer inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent-cyan/50 hover:bg-white/10 sm:w-auto"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18v-7.5H5.67V18h2.67zM7 9.5a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zM18.34 18v-4.12c0-2.2-1.18-3.23-2.75-3.23a2.37 2.37 0 00-2.15 1.18h-.03V10.5h-2.56c.03.7 0 7.5 0 7.5h2.56v-4.19c0-.22.02-.45.09-.6.2-.45.6-.92 1.32-.92.93 0 1.3.71 1.3 1.74V18h2.56z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
