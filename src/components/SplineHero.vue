<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasRef = ref(null)
let splineApp = null
const isLoaded = ref(false)

const SCENE_URL = 'https://prod.spline.design/ScF2Zh56RMx7osFJ/scene.splinecode'

onMounted(async () => {
  if (!canvasRef.value) return
  try {
    const { Application } = await import('@splinetool/runtime')
    splineApp = new Application(canvasRef.value)
    await splineApp.load(SCENE_URL)
    isLoaded.value = true
  } catch (e) {
    console.warn('Spline load failed:', e)
  }
})

onBeforeUnmount(() => splineApp?.dispose?.())

defineExpose({ getApp: () => splineApp, isLoaded })
</script>

<template>
  <div class="spline-bg" aria-hidden="true">
    <Transition name="sf">
      <div v-if="!isLoaded" class="spline-loading">
        <div class="ring" />
      </div>
    </Transition>
    <canvas
      ref="canvasRef"
      class="spline-canvas"
      :style="{ opacity: isLoaded ? 1 : 0 }"
    />
  </div>
</template>

<style scoped>
.spline-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.spline-loading {
  position: absolute;
  inset: 0;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  animation: spin 0.9s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.spline-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.sf-leave-active { transition: opacity 0.8s ease; }
.sf-leave-to { opacity: 0; }
</style>
