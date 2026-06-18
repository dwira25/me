<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { shouldSkipIntro } from '../composables/usePerformanceMode.js'

const isVisible = ref(false)
const isExiting = ref(false)
let enterTimer = null
let exitTimer = null

onMounted(() => {
  if (shouldSkipIntro()) return

  const seenKey = 'welcome-intro-seen'
  if (window.sessionStorage.getItem(seenKey) === '1') return

  window.sessionStorage.setItem(seenKey, '1')
  isVisible.value = true

  enterTimer = window.setTimeout(() => {
    isExiting.value = true
  }, 900)

  exitTimer = window.setTimeout(() => {
    isVisible.value = false
  }, 1500)
})

onUnmounted(() => {
  clearTimeout(enterTimer)
  clearTimeout(exitTimer)
})
</script>

<template>
  <div
    v-if="isVisible"
    class="intro-lite"
    :class="{ 'is-exiting': isExiting }"
    aria-hidden="true"
  >
    <span class="intro-lite-orb orb-a" />
    <span class="intro-lite-orb orb-b" />
    <span class="intro-lite-orb orb-c" />
    <div class="intro-lite-panel">
      <div class="intro-lite-top">
        <p class="intro-lite-kicker">Welcome</p>
        <span class="intro-lite-chip">Loading</span>
      </div>
      <div class="intro-lite-title">
        <span class="intro-lite-word">Dwira</span>
        <span class="intro-lite-word accent">Naufal</span>
        <span class="intro-lite-word">Siregar</span>
      </div>
      <p class="intro-lite-subtitle">Portfolio cepat, langsung masuk.</p>
      <div class="intro-lite-track" aria-hidden="true">
        <span class="intro-lite-track-fill" />
      </div>
    </div>
  </div>
</template>
