<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const props = defineProps({ size: { type: Number, default: 280 } })
const canvasRef = ref(null)

let renderer, scene, camera, animFrame
let sphere, ring1, ring2, orbitLight
let targetScale = 1, currentScale = 1
let hovered = false

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
  camera.position.z = 3.2

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(props.size, props.size)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Sphere utama
  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 64, 64),
    new THREE.MeshPhongMaterial({ color: 0x22d3ee, shininess: 120, transparent: true, opacity: 0.85 })
  )
  scene.add(sphere)

  // Ring 1: equatorial
  ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.15, 0.018, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.45 })
  )
  scene.add(ring1)

  // Ring 2: miring 60deg
  ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.009, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.35 })
  )
  ring2.rotation.x = Math.PI / 3
  ring2.rotation.y = Math.PI / 6
  scene.add(ring2)

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4))
  const topLight = new THREE.PointLight(0xffffff, 1.2, 10)
  topLight.position.set(0, 3, 3)
  scene.add(topLight)

  orbitLight = new THREE.PointLight(0x3b82f6, 2, 8)
  scene.add(orbitLight)

  animate()
}

function animate() {
  animFrame = requestAnimationFrame(animate)
  const t = Date.now() * 0.001

  sphere.rotation.y += 0.004
  ring1.rotation.y += 0.008
  ring2.rotation.z += 0.005

  // Orbit light mengelilingi sphere
  orbitLight.position.set(Math.cos(t * 0.8) * 2, Math.sin(t * 0.4) * 0.8, Math.sin(t * 0.8) * 2)

  // Scale lerp on hover
  currentScale += (targetScale - currentScale) * 0.08
  sphere.scale.setScalar(currentScale)

  renderer.render(scene, camera)
}

function onHoverIn() { hovered = true; targetScale = 1.12 }
function onHoverOut() { hovered = false; targetScale = 1 }

onMounted(() => { init() })
onBeforeUnmount(() => {
  cancelAnimationFrame(animFrame)
  renderer?.dispose()
})
</script>

<template>
  <div
    class="relative inline-block cursor-pointer"
    :style="{ width: `${size}px`, height: `${size}px` }"
    @mouseenter="onHoverIn"
    @mouseleave="onHoverOut"
  >
    <canvas ref="canvasRef" />
    <!-- Glow halo CSS -->
    <div
      class="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
      :class="hovered ? 'opacity-100' : 'opacity-50'"
      style="background: radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18) 0%, transparent 70%)"
    />
  </div>
</template>
