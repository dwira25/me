<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import {
  prefersReducedMotion,
  shouldUseHeroScene,
  scheduleIdle,
} from '../composables/usePerformanceMode.js'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const SplineHero = defineAsyncComponent(() => import('./SplineHero.vue'))

// ── Refs ─────────────────────────────────────────────────────────────
const heroSection   = ref(null)
const heroContent   = ref(null)
const particlesCvs  = ref(null)
const statProjects  = ref(null)
const splineHeroRef = ref(null)
const aiRef         = ref(null)
const roleRef       = ref(null)
const statsRef      = ref(null)
const ctasRef       = ref(null)
const showSpline    = ref(false)
const useHeroScene  = shouldUseHeroScene()
const shouldShowSplineHero = useHeroScene

const NAME_LINES = [
  { text: 'Dwira',   accent: false },
  { text: 'Naufal',  accent: false },
  { text: 'Siregar', accent: true  },
]

// ── AI Typewriter ─────────────────────────────────────────────────────
const AI_PHRASES = [
  'Building AI Workspaces',
  'Automating Workflows',
  'Delivering PMO Systems',
  'Integrating AI Agents',
  'Implementing ClickUp',
  'Scaling Project Teams',
]
const aiText = ref('')
let aiTimer = null, phraseIdx = 0, charIdx = 0, isDeleting = false
let idleHandle = null

function tickTypewriter() {
  const phrase = AI_PHRASES[phraseIdx]
  isDeleting
    ? (aiText.value = phrase.slice(0, --charIdx))
    : (aiText.value = phrase.slice(0, ++charIdx))

  if (!isDeleting && charIdx === phrase.length) {
    isDeleting = true
    aiTimer = setTimeout(tickTypewriter, 1800)
    return
  }
  if (isDeleting && charIdx === 0) {
    isDeleting = false
    phraseIdx = (phraseIdx + 1) % AI_PHRASES.length
  }
  aiTimer = setTimeout(tickTypewriter, isDeleting ? 32 : 68)
}

// ── Three.js — multi-color particles with mouse parallax ──────────────
let THREE_LIB = null
let r3 = null, scene3 = null, cam3 = null, pts3 = null, af3 = null
let baseRotX = 0, baseRotY = 0
let mTargetX = 0, mTargetY = 0, mCurrX = 0, mCurrY = 0
let heroVisible = true
let heroObserver = null
let gsapLib = null
let ScrollTriggerLib = null
let scrollCtx = null
let isDisposed = false

async function loadMotionLibs() {
  if (gsapLib && ScrollTriggerLib) return

  const [gsapMod, triggerMod] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])

  gsapLib = gsapMod.gsap ?? gsapMod.default ?? gsapMod
  ScrollTriggerLib = triggerMod.ScrollTrigger ?? triggerMod.default ?? triggerMod
  gsapLib.registerPlugin(ScrollTriggerLib)
}

function onMouseMove(e) {
  mTargetX = (e.clientX / window.innerWidth - 0.5) * 2
  mTargetY = -(e.clientY / window.innerHeight - 0.5) * 2
}

async function initThree() {
  const canvas = particlesCvs.value
  if (!canvas || isDisposed) return

  if (!THREE_LIB) {
    THREE_LIB = await import('three')
  }

  if (isDisposed || !canvas) return

  const THREE = THREE_LIB

  r3 = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
  r3.setPixelRatio(Math.min(window.devicePixelRatio, 1.0))
  r3.setSize(window.innerWidth, window.innerHeight)
  r3.setClearColor(0x000000, 0)

  scene3 = new THREE.Scene()
  cam3   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  cam3.position.z = 6

  const COUNT  = 150
  const pos    = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)

  for (let i = 0; i < COUNT; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 20
    pos[i*3+1] = (Math.random() - 0.5) * 16
    pos[i*3+2] = (Math.random() - 0.5) * 10

    if (Math.random() > 0.38) {
      colors[i*3] = 0.196; colors[i*3+1] = 0.568; colors[i*3+2] = 1.0
    } else {
      const v = 0.75 + Math.random() * 0.25
      colors[i*3] = v; colors[i*3+1] = v; colors[i*3+2] = v
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

  pts3 = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.026, vertexColors: true,
    transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }))
  scene3.add(pts3)
  tickThree()

  if (heroSection.value) watchHeroVisibility(heroSection.value)
}

function tickThree() {
  if (!heroVisible) { af3 = null; return }
  af3 = requestAnimationFrame(tickThree)
  if (!pts3 || !r3) return
  baseRotY += 0.00055
  baseRotX += 0.00022
  mCurrX   += (mTargetX * 0.28 - mCurrX) * 0.025
  mCurrY   += (mTargetY * 0.18 - mCurrY) * 0.025
  pts3.rotation.y = baseRotY + mCurrX
  pts3.rotation.x = baseRotX + mCurrY
  r3.render(scene3, cam3)
}

function resizeThree() {
  if (!r3 || !cam3) return
  cam3.aspect = window.innerWidth / window.innerHeight
  cam3.updateProjectionMatrix()
  r3.setSize(window.innerWidth, window.innerHeight)
}

function watchHeroVisibility(el) {
  heroObserver = new IntersectionObserver(
    ([entry]) => {
      heroVisible = entry.isIntersecting
      if (heroVisible && !af3) tickThree()
    },
    { threshold: 0 }
  )
  heroObserver.observe(el)
}

function destroyThree() {
  cancelAnimationFrame(af3)
  af3 = null
  heroObserver?.disconnect()
  r3?.dispose()
}

// ── Number scramble ───────────────────────────────────────────────────
function scrambleNumber(el, target, totalMs = 1600) {
  if (!el) return
  const start = performance.now()
  const tick = () => {
    const p = Math.min((performance.now() - start) / totalMs, 1)
    if (p < 0.6)  el.textContent = Math.floor(Math.random() * 99) + '+'
    else           el.textContent = Math.round(((p - 0.6) / 0.4) * target) + '+'
    if (p < 1) requestAnimationFrame(tick)
    else       el.textContent = target + '+'
  }
  requestAnimationFrame(tick)
}

// ── GSAP: entrance + scroll ───────────────────────────────────────────
async function initEntrance() {
  await loadMotionLibs()
  if (isDisposed) return

  gsapLib.set(aiRef.value,    { opacity: 0, x: -20 })
  gsapLib.set([roleRef.value, statsRef.value, ctasRef.value], { opacity: 0, y: 20 })

  gsapLib.to(aiRef.value,    { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: 2.6  })
  gsapLib.to(roleRef.value,  { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 3.05 })
  gsapLib.to(statsRef.value, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 3.15 })
  gsapLib.to(ctasRef.value,  { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 3.30 })
}

async function initScroll() {
  await loadMotionLibs()
  if (isDisposed) return

  scrollCtx = gsapLib.context(() => {
    gsapLib.to(heroContent.value, {
      y: -70, opacity: 0, ease: 'none',
      scrollTrigger: {
        trigger: heroSection.value,
        start: 'top top', end: '48% top', scrub: 0.7,
      },
    })

    ScrollTriggerLib.create({
      trigger: heroSection.value,
      start: 'top top', end: '38% top', scrub: true,
      onUpdate: (self) => {
        if (pts3?.material) pts3.material.opacity = 0.5 * (1 - self.progress)
        const app = splineHeroRef.value?.getApp()
        if (app) try { app.setVariable?.('scrollProgress', self.progress) } catch (_) {}
      },
    })

    ScrollTriggerLib.create({
      trigger: statsRef.value,
      start: 'top 92%', once: true,
      onEnter: () => scrambleNumber(statProjects.value, 40),
    })
  })
}

// ── Lifecycle ─────────────────────────────────────────────────────────
onMounted(() => {
  isDisposed = false
  if (prefersReducedMotion()) {
    aiText.value = AI_PHRASES[0]
    return
  }

  if (shouldShowSplineHero) {
    if (useHeroScene) {
      idleHandle = scheduleIdle(() => {
        if (!isDisposed) showSpline.value = true
      }, 900)
    } else {
      idleHandle = window.setTimeout(() => {
        if (!isDisposed) showSpline.value = true
      }, 350)
    }
  }

  if (!useHeroScene) {
    aiText.value = AI_PHRASES[0]
    return
  }

  aiTimer = setTimeout(tickTypewriter, 700)

  void initThree()
  window.addEventListener('resize', resizeThree)
  window.addEventListener('mousemove', onMouseMove)
  void initEntrance()
  void initScroll()
})

onUnmounted(() => {
  isDisposed = true
  clearTimeout(aiTimer)
  if (idleHandle != null) {
    if (window.cancelIdleCallback && typeof idleHandle === 'number') {
      window.cancelIdleCallback(idleHandle)
    } else {
      clearTimeout(idleHandle)
    }
  }
  destroyThree()
  scrollCtx?.revert()
  window.removeEventListener('resize', resizeThree)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <section id="home" ref="heroSection" class="hero-section">

    <!-- Layer 0 · Spline 3D — load only on large screens -->
    <SplineHero v-if="showSpline" ref="splineHeroRef" />
    <div v-else class="hero-static-scene" aria-hidden="true" />

    <!-- Layer 1 · Three.js particles -->
    <canvas v-if="useHeroScene" ref="particlesCvs" class="particles-canvas" aria-hidden="true" />

    <!-- Layer 2 · Readability gradients -->
    <div class="grad-left"   aria-hidden="true" />
    <div class="grad-bottom" aria-hidden="true" />

    <!-- Layer 3 · Content -->
    <div ref="heroContent" class="hero-body">
      <div class="hero-float">

        <!-- AI typewriter badge -->
        <div ref="aiRef" class="ai-badge">
          <span class="ai-dot" aria-hidden="true" />
          <span class="mono">AI · {{ aiText }}<span class="cursor" aria-hidden="true">|</span></span>
        </div>

        <!-- Name — letter-by-letter reveal -->
        <h1 class="hero-name" aria-label="Dwira Naufal Siregar">
          <span
            v-for="(line, li) in NAME_LINES"
            :key="li"
            class="name-row"
            :class="{ 'name-accent': line.accent }"
          >
            <span
              v-for="(ch, ci) in line.text.split('')"
              :key="ci"
              class="ltr"
              :style="{ animationDelay: `${2650 + li * 160 + ci * 48}ms` }"
            >{{ ch }}</span>
          </span>
        </h1>

        <!-- Role -->
        <p ref="roleRef" class="hero-role">
          {{ t('hero.role1') }}
          <span class="sep">·</span>{{ t('hero.role2') }}
          <span class="sep">·</span>{{ t('hero.role3') }}
        </p>

        <!-- Stats glass card -->
        <div ref="statsRef" class="stats-card">
          <div class="stat">
            <span class="stat-val">2018</span>
            <span class="stat-lbl">{{ t('hero.since') }}</span>
          </div>
          <span class="stat-div" aria-hidden="true" />
          <div class="stat">
            <span ref="statProjects" class="stat-val accent">40+</span>
            <span class="stat-lbl">{{ t('hero.systems') }}</span>
          </div>
          <span class="stat-div" aria-hidden="true" />
          <div class="stat">
            <span class="stat-val">PMO</span>
            <span class="stat-lbl">{{ t('hero.discipline') }}</span>
          </div>
        </div>

        <!-- CTAs -->
        <div ref="ctasRef" class="hero-ctas">
          <a href="#projects" class="btn-primary">
            {{ t('hero.cta.view') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" class="btn-secondary">{{ t('hero.cta.contact') }}</a>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-label">Scroll</span>
      <div class="scroll-line" />
    </div>

  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────────────────── */
.hero-section {
  position: relative;
  width: 100%;
  height: 100dvh;
  min-height: 600px;
  overflow: hidden;
}

/* ── Three.js canvas ──────────────────────────────────────────────── */
.particles-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

/* ── Static fallback scene ────────────────────────────────────────── */
.hero-static-scene {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(50, 145, 255, 0.14), transparent 32%),
    radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.14), transparent 34%),
    linear-gradient(135deg, rgba(17, 17, 17, 0.04), transparent 48%);
  opacity: 0.9;
  pointer-events: none;
  z-index: 1;
}

/* ── Gradient overlays ────────────────────────────────────────────── */
.grad-left {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--bg) 0%, var(--bg) 10%, transparent 58%);
  opacity: 0.88;
  pointer-events: none;
  z-index: 3;
}
.grad-bottom {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg) 0%, transparent 42%);
  pointer-events: none;
  z-index: 3;
}

/* ── Body + float wrapper ─────────────────────────────────────────── */
.hero-body {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(1.5rem, 6vw, 6rem);
  padding-top: 5rem;
  max-width: 640px;
}

.hero-float {
  animation: float 7s ease-in-out infinite;
  animation-delay: 4s;
  animation-fill-mode: backwards;
}
@keyframes float {
  0%, 100% { transform: translateY(0);   }
  50%       { transform: translateY(-8px); }
}

/* ── AI Badge ─────────────────────────────────────────────────────── */
.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(50, 145, 255, 0.1);
  border: 1px solid rgba(50, 145, 255, 0.25);
  font-size: 11.5px;
  color: var(--accent);
  margin-bottom: 1.5rem;
  width: fit-content;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background 0.3s ease, border-color 0.3s ease;
}
.ai-badge:hover {
  background: rgba(50, 145, 255, 0.15);
  border-color: rgba(50, 145, 255, 0.4);
}

/* Dot + expanding ring */
.ai-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  animation: dot-pulse 1.5s ease-in-out infinite;
}
.ai-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  animation: ring-expand 2s ease-out infinite;
}
@keyframes dot-pulse {
  0%, 100% { opacity: 1;   transform: scale(1);   }
  50%       { opacity: 0.4; transform: scale(0.65); }
}
@keyframes ring-expand {
  0%   { transform: scale(1);   opacity: 0.8; }
  70%  { transform: scale(2.6); opacity: 0;   }
  100% { transform: scale(1);   opacity: 0;   }
}

.mono { font-family: 'SF Mono', 'Fira Code', monospace; }

.cursor {
  display: inline-block;
  margin-left: 1px;
  animation: blink 0.72s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 0.8; }
  50%       { opacity: 0;   }
}

/* ── Name — letter-by-letter animation ────────────────────────────── */
.hero-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.6rem, 9.5vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.048em;
  line-height: 0.92;
  color: var(--text);
  margin-bottom: 1.25rem;
}

.name-row {
  display: block;
  overflow: hidden;
  line-height: 1.05;
  padding-bottom: 0.18em;
  margin-bottom: -0.18em;
}
.name-accent .ltr { color: var(--accent); }

.ltr {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.75em);
  filter: blur(5px);
  animation: ltr-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes ltr-in {
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

/* ── Role ─────────────────────────────────────────────────────────── */
.hero-role {
  font-size: clamp(0.7rem, 1.3vw, 0.9rem);
  color: var(--text-2);
  margin-bottom: 1.75rem;
  letter-spacing: 0.01em;
  line-height: 1.7;
}
.sep {
  display: inline-block;
  margin: 0 0.5em;
  color: var(--text-3);
}

/* ── Stats glass card ─────────────────────────────────────────────── */
.stats-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.875rem 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: fit-content;
  margin-bottom: 1.75rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.stats-card:hover {
  border-color: rgba(50, 145, 255, 0.28);
  box-shadow: 0 0 24px rgba(50, 145, 255, 0.08);
}

.stat { display: flex; flex-direction: column; gap: 3px; }

.stat-val {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--text);
}
.stat-val.accent { color: var(--accent); }

.stat-lbl {
  font-size: 9px;
  color: var(--text-3);
  font-family: 'SF Mono', 'Fira Code', monospace;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-div {
  display: block;
  width: 1px; height: 28px;
  background: var(--border);
  flex-shrink: 0;
}

/* ── CTAs ─────────────────────────────────────────────────────────── */
.hero-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }

.btn-primary {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.2s var(--ease), box-shadow 0.2s ease;
}
.btn-primary::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 55%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
  transform: skewX(-18deg);
  transition: left 0.55s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(50, 145, 255, 0.45);
}
.btn-primary:hover::after { left: 145%; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 11px 24px;
  background: var(--bg-secondary);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s var(--ease);
}
.btn-secondary:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

/* ── Scroll indicator ─────────────────────────────────────────────── */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.scroll-label {
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.scroll-line {
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, var(--border-strong), transparent);
  animation: scroll-ani 1.6s ease-in-out infinite;
}
@keyframes scroll-ani {
  0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
  45%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
  55%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}

/* ── Reduced motion ───────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ltr       { opacity: 1; transform: none; filter: none; animation: none; }
  .hero-float { animation: none; }
  .ai-dot::after { animation: none; }
}

/* ── Tablet (768–1024px) ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-body { max-width: 520px; }
  .grad-left {
    background: linear-gradient(90deg, var(--bg) 0%, var(--bg) 8%, transparent 62%);
  }
  .hero-static-scene {
    opacity: 0.75;
  }
}

/* ── Mobile (≤ 768px) ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  /* Switch to bottom-up gradient — Spline shows at top */
  .grad-left {
    background: none;
  }
  .grad-bottom {
    background: linear-gradient(to top, var(--bg) 0%, var(--bg) 22%, transparent 68%);
  }

  /* Content anchored to bottom */
  .hero-body {
    justify-content: flex-end;
    padding: 0 1.25rem 1rem;
    padding-top: 0;
    max-width: 100%;
  }

  .hero-float { animation: none; }

  /* Tighter badge on mobile */
  .ai-badge { font-size: 10.5px; padding: 5px 12px; margin-bottom: 1rem; }

  /* Smaller name */
  .hero-name {
    font-size: clamp(2.6rem, 12vw, 4rem);
    line-height: 0.95;
    margin-bottom: 0.875rem;
  }

  /* Role wraps naturally */
  .hero-role {
    font-size: 0.78rem;
    margin-bottom: 1.25rem;
    line-height: 1.7;
  }
  .sep { margin: 0 0.3em; }

  /* Stats: horizontal scroll on very small screens */
  .stats-card {
    gap: 0.875rem;
    padding: 0.75rem 1rem;
    margin-bottom: 1.25rem;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .stats-card::-webkit-scrollbar { display: none; }
  .stat-val { font-size: 1.15rem; }

  /* Stack CTAs vertically */
  .hero-ctas { flex-direction: column; gap: 0.5rem; }
  .btn-primary,
  .btn-secondary { justify-content: center; width: 100%; padding: 12px 20px; }

  /* Hide scroll indicator on mobile (too cluttered) */
  .scroll-indicator { display: none; }
}

/* ── Small phones (≤ 390px) ───────────────────────────────────────── */
@media (max-width: 390px) {
  .hero-name { font-size: clamp(2.2rem, 13vw, 3rem); }
  .hero-body { padding: 0 1rem 1rem; }
}
</style>
