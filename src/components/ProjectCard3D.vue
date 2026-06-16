<script setup>
// ProjectCard3D: pure CSS 3D + lightweight canvas 2D drawing
// Tidak menggunakan WebGL/Three.js — menghindari GPU overload dari 13 context sekaligus
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  gradient: { type: String, default: 'from-accent-cyan to-accent-violet' },
  index:    { type: Number, default: 0 }
})

const canvasRef = ref(null)
let animFrame, ctx, W, H, t = 0

// Warna per index — 3 palette berputar
const palettes = [
  ['#22d3ee', '#3b82f6'],
  ['#3b82f6', '#8b5cf6'],
  ['#8b5cf6', '#22d3ee'],
]

function draw() {
  animFrame = requestAnimationFrame(draw)
  t += 0.012
  ctx.clearRect(0, 0, W, H)

  const [c1, c2] = palettes[props.index % 3]

  // Shape berbeda per index (canvas 2D, sangat ringan)
  ctx.save()
  ctx.translate(W * 0.72, H * 0.5)

  const sides = 3 + (props.index % 5) // 3..7 sisi
  const r = Math.min(W, H) * 0.28
  ctx.globalAlpha = 0.18 + Math.sin(t) * 0.04

  // Outer shape rotate
  ctx.rotate(t * 0.4)
  ctx.beginPath()
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2 - Math.PI / 2
    const x = Math.cos(a) * r
    const y = Math.sin(a) * r
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = c1
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Inner shape counter-rotate
  ctx.rotate(-t * 0.8)
  ctx.beginPath()
  const sides2 = sides + 2
  const r2 = r * 0.55
  for (let i = 0; i < sides2; i++) {
    const a = (i / sides2) * Math.PI * 2
    const x = Math.cos(a) * r2
    const y = Math.sin(a) * r2
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = c2
  ctx.lineWidth = 1
  ctx.stroke()

  // Center dot pulse
  ctx.globalAlpha = 0.5 + Math.sin(t * 2) * 0.3
  ctx.beginPath()
  ctx.arc(0, 0, 3 + Math.sin(t * 3) * 1.5, 0, Math.PI * 2)
  ctx.fillStyle = c1
  ctx.fill()

  ctx.restore()

  // Floating particles (3 titik)
  for (let i = 0; i < 3; i++) {
    const px = W * (0.1 + i * 0.12) + Math.sin(t + i * 2) * 6
    const py = H * 0.3 + Math.cos(t * 0.7 + i) * 8
    ctx.globalAlpha = 0.3 + Math.sin(t + i) * 0.15
    ctx.beginPath()
    ctx.arc(px, py, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = i % 2 === 0 ? c1 : c2
    ctx.fill()
  }
}

onMounted(() => {
  const el = canvasRef.value
  W = el.offsetWidth || 400
  H = el.offsetHeight || 140
  el.width = W
  el.height = H
  ctx = el.getContext('2d')
  draw()
})

onBeforeUnmount(() => { cancelAnimationFrame(animFrame) })
</script>

<template>
  <div class="relative w-full overflow-hidden" style="height:clamp(120px,18vw,160px)">
    <!-- Gradient background dari data project -->
    <div
      class="absolute inset-0 bg-gradient-to-br opacity-10"
      :class="gradient"
    />
    <div class="absolute inset-0 bg-navy-900/60" />
    <!-- Canvas 2D ringan untuk shape animasi -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
    <slot />
  </div>
</template>
