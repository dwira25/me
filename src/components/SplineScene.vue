<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
let renderer, scene, camera, animFrame
let objects = []
let scrollY = 0

const defs = [
  { geo: () => new THREE.BoxGeometry(0.5, 0.5, 0.5), mat: () => new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true }), x: -2.4, y: 0.3 },
  { geo: () => new THREE.OctahedronGeometry(0.42),    mat: () => new THREE.MeshPhongMaterial({ color: 0x8b5cf6, shininess: 80 }), x: -1.1, y: -0.3 },
  { geo: () => new THREE.TorusGeometry(0.32, 0.12, 16, 40), mat: () => new THREE.MeshPhongMaterial({ color: 0x3b82f6, shininess: 60 }), x: 0.2, y: 0.25 },
  { geo: () => new THREE.IcosahedronGeometry(0.38, 0), mat: () => new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true }), x: 1.4, y: -0.2 },
  { geo: () => new THREE.TetrahedronGeometry(0.44),   mat: () => new THREE.MeshPhongMaterial({ color: 0x8b5cf6, shininess: 90 }), x: 2.5, y: 0.1 },
]

const speeds = [
  { rx: 0.006, ry: 0.009, freq: 0.9, phase: 0 },
  { rx: 0.004, ry: 0.007, freq: 1.1, phase: 1.2 },
  { rx: 0.008, ry: 0.005, freq: 0.8, phase: 2.4 },
  { rx: 0.005, ry: 0.011, freq: 1.3, phase: 0.7 },
  { rx: 0.007, ry: 0.006, freq: 1.0, phase: 1.8 },
]

function getSize() {
  const W = canvasRef.value?.parentElement?.clientWidth || window.innerWidth || 600
  const H = window.innerWidth < 640 ? 180 : 280
  return { W: Math.max(W, 100), H }
}

function init() {
  const { W, H } = getSize()

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
  camera.position.z = 4.5

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const l1 = new THREE.PointLight(0x22d3ee, 2.5, 15); l1.position.set(-3, 3, 3); scene.add(l1)
  const l2 = new THREE.PointLight(0x8b5cf6, 2, 12);   l2.position.set(3, -2, 2); scene.add(l2)

  defs.forEach((d, i) => {
    const mesh = new THREE.Mesh(d.geo(), d.mat())
    mesh.position.set(d.x, d.y, 0)
    scene.add(mesh)
    objects.push({ mesh, sp: speeds[i], baseY: d.y })
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  animate()
}

function onScroll() { scrollY = window.scrollY }

function onResize() {
  if (!renderer) return
  const { W, H } = getSize()
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

function animate() {
  animFrame = requestAnimationFrame(animate)
  const t = Date.now() * 0.001
  const parallax = scrollY * 0.0008

  objects.forEach(({ mesh, sp, baseY }) => {
    mesh.rotation.x += sp.rx
    mesh.rotation.y += sp.ry
    mesh.position.y = baseY + Math.sin(t * sp.freq + sp.phase) * 0.18 + parallax
  })

  renderer.render(scene, camera)
}

onMounted(() => { init() })

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  objects.forEach(({ mesh }) => {
    mesh.geometry.dispose()
    mesh.material.dispose()
  })
  objects = []
  renderer?.dispose()
})
</script>

<template>
  <div class="relative w-full overflow-hidden" style="height:clamp(160px,25vw,280px)">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
    <div class="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24" style="background:linear-gradient(to right,var(--color-bg),transparent)" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24" style="background:linear-gradient(to left,var(--color-bg),transparent)" />
  </div>
</template>
