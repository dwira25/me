<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const isVisible = ref(true)
const isExiting = ref(false)
let t1, t2

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = false
    return
  }
  document.body.style.overflow = 'hidden'
  t1 = setTimeout(() => { isExiting.value = true }, 2000)
  t2 = setTimeout(() => { isVisible.value = false; document.body.style.overflow = '' }, 2600)
})

onUnmounted(() => {
  clearTimeout(t1); clearTimeout(t2)
  document.body.style.overflow = ''
})

const { t } = useI18n()
const NAME = ['Dwira', 'Naufal', 'Siregar']
</script>

<template>
  <div
    v-if="isVisible"
    class="intro-wrap"
    :class="{ 'is-exiting': isExiting }"
    aria-hidden="true"
  >
    <!-- Animated grid background -->
    <div class="intro-grid" />

    <!-- Center content -->
    <div class="intro-center">
      <div class="intro-label">Portfolio · 2026</div>

      <div class="intro-name">
        <span
          v-for="(word, i) in NAME"
          :key="word"
          class="intro-word"
          :class="{ 'word-accent': i === 2 }"
          :style="{ animationDelay: `${i * 115}ms` }"
        >{{ word }}</span>
      </div>

      <p class="intro-role" style="animation-delay: 380ms">
        {{ t('intro.role') }}
      </p>
    </div>

    <!-- Progress bar sweeping across bottom -->
    <div class="intro-progress" />

    <!-- Corner bracket decorations -->
    <span class="corner corner-tl" />
    <span class="corner corner-br" />
  </div>
</template>

<style scoped>
.intro-wrap {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.76, 0, 0.24, 1);
}
.intro-wrap.is-exiting {
  opacity: 0;
  transform: scale(1.05);
}

/* Animated grid */
.intro-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0;
  animation: grid-fade 0.5s ease 0.1s forwards;
}
@keyframes grid-fade { to { opacity: 1; } }

/* Center block */
.intro-center {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Label */
.intro-label {
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-3);
  font-family: 'SF Mono', 'Fira Code', monospace;
  opacity: 0;
  animation: rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
  margin-bottom: 0.5rem;
}

/* Name words */
.intro-name {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25em;
  flex-wrap: wrap;
}

.intro-word {
  display: inline-block;
  font-size: clamp(3rem, 10vw, 6.5rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--text);
  opacity: 0;
  transform: translateY(28px);
  filter: blur(4px);
  animation: rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.word-accent { color: var(--accent); }

.intro-role {
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  color: var(--text-3);
  letter-spacing: 0.04em;
  opacity: 0;
  transform: translateY(12px);
  animation: rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  margin-top: 0.25rem;
}

@keyframes rise {
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

/* Progress bar */
.intro-progress {
  position: absolute;
  bottom: 0; left: 0;
  height: 2px;
  background: var(--accent);
  width: 0%;
  animation: progress-run 2s linear forwards;
  box-shadow: 0 0 8px var(--accent);
}
@keyframes progress-run {
  from { width: 0%; }
  to   { width: 100%; }
}

/* Corner brackets */
.corner {
  position: absolute;
  width: 20px; height: 20px;
  border-color: var(--border-strong);
  border-style: solid;
  opacity: 0;
  animation: corner-in 0.4s ease 0.2s forwards;
}
.corner-tl { top: 1.5rem; left: 1.5rem; border-width: 1px 0 0 1px; }
.corner-br { bottom: 1.5rem; right: 1.5rem; border-width: 0 1px 1px 0; }
@keyframes corner-in { to { opacity: 1; } }

/* Mobile */
@media (max-width: 480px) {
  .intro-word { font-size: clamp(2.2rem, 14vw, 4rem); }
  .intro-name { gap: 0.15em; }
}
</style>
