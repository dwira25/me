<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(true)
const isExiting = ref(false)

const nameParts = [
  { text: 'Dwira', gradient: false },
  { text: 'Naufal', gradient: false },
  { text: 'Siregar', gradient: true },
]

let letterIndex = 0
const nameWords = nameParts.map((part) => {
  const letters = part.text.split('').map((char) => {
    const delay = letterIndex * 40
    letterIndex += 1
    return { char, delay }
  })
  return { ...part, letters }
})

const particles = [
  { top: '18%', left: '22%', size: '6px', delay: '0ms' },
  { top: '28%', left: '78%', size: '4px', delay: '300ms' },
  { top: '68%', left: '18%', size: '5px', delay: '600ms' },
  { top: '78%', left: '74%', size: '3px', delay: '150ms' },
  { top: '42%', left: '90%', size: '4px', delay: '450ms' },
  { top: '60%', left: '8%', size: '5px', delay: '750ms' },
  { top: '12%', left: '55%', size: '3px', delay: '900ms' },
  { top: '85%', left: '45%', size: '4px', delay: '1050ms' },
]

let exitTimer
let hideTimer

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    isVisible.value = false
    return
  }

  document.body.style.overflow = 'hidden'

  exitTimer = setTimeout(() => {
    isExiting.value = true
  }, 2400)

  hideTimer = setTimeout(() => {
    isVisible.value = false
    document.body.style.overflow = ''
  }, 3400)
})

onUnmounted(() => {
  clearTimeout(exitTimer)
  clearTimeout(hideTimer)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    v-if="isVisible"
    class="intro-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-950 bg-grid-pattern bg-grid"
    :class="{ 'intro-exit pointer-events-none': isExiting }"
    aria-hidden="true"
  >
    <div class="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] bg-accent-violet/20 blur-3xl animate-blob"></div>
    <div class="absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-accent-cyan/15 blur-3xl animate-float-slow"></div>

    <!-- Sonar pulse ring -->
    <span class="intro-pulse-ring border border-accent-cyan/60"></span>

    <!-- Rotating gradient rings -->
    <span
      class="absolute left-1/2 top-1/2 h-72 w-72 rounded-full opacity-40 animate-spin-slow-center sm:h-96 sm:w-96"
      style="background: conic-gradient(from 0deg, transparent 0%, var(--color-accent-cyan) 18%, transparent 36%); mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px));"
    ></span>
    <span
      class="absolute left-1/2 top-1/2 h-56 w-56 rounded-full opacity-40 animate-spin-reverse sm:h-72 sm:w-72"
      style="background: conic-gradient(from 90deg, transparent 0%, var(--color-accent-violet) 22%, transparent 44%); mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px));"
    ></span>

    <!-- Sparkle particles -->
    <span
      v-for="(particle, index) in particles"
      :key="index"
      class="intro-particle absolute"
      :style="{ top: particle.top, left: particle.left, width: particle.size, height: particle.size, animationDelay: particle.delay }"
    ></span>

    <div class="relative flex flex-col items-center px-6 text-center">
      <h1 class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
        <span v-for="word in nameWords" :key="word.text" class="inline-flex">
          <span
            v-for="(letter, index) in word.letters"
            :key="index"
            class="intro-letter"
            :class="word.gradient ? 'gradient-text-animated animate-gradient-x' : ''"
            :style="{ animationDelay: `${letter.delay}ms` }"
          >{{ letter.char }}</span>
        </span>
      </h1>

      <p
        class="intro-tagline animate-fade-up mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent-cyan sm:text-sm"
        style="opacity: 0; animation-delay: 900ms"
      >
        IT Project Manager Officer &middot; ClickUp Consultant - AI Agent Builder
      </p>

      <div class="mt-10 h-px w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
        <div class="intro-progress-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet"></div>
      </div>
    </div>
  </div>
</template>
