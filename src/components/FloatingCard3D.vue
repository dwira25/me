<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
let renderer, scene, camera, animId
let card, cardEdges, orb1, orb2, particles
let mouseX = 0, mouseY = 0
let targetX = 0, targetY = 0

function buildScene() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.3))
  const l1 = new THREE.DirectionalLight(0x0070f3, 2.5)
  l1.position.set(2, 3, 4)
  scene.add(l1)
  const l2 = new THREE.PointLight(0x3291ff, 1.5, 10)
  l2.position.set(-3, -1, 2)
  scene.add(l2)

  // Main card — glass-like plane
  const cardGeo = new THREE.BoxGeometry(2.8, 1.8, 0.06)
  const cardMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a1a2e,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.85,
    reflectivity: 0.9,
  })
  card = new THREE.Mesh(cardGeo, cardMat)
  scene.add(card)

  // Card wireframe outline
  cardEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(2.8, 1.8, 0.06)),
    new THREE.LineBasicMaterial({ color: 0x0070f3, transparent: true, opacity: 0.5 })
  )
  scene.add(cardEdges)

  // Floating orbs around card
  const orbGeo = new THREE.SphereGeometry(0.12, 16, 16)
  orb1 = new THREE.Mesh(orbGeo, new THREE.MeshPhongMaterial({ color: 0x0070f3, emissive: 0x003380, shininess: 100 }))
  orb1.position.set(1.6, 0.8, 0.3)
  scene.add(orb1)

  orb2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshPhongMaterial({ color: 0x3291ff, emissive: 0x001a60, shininess: 100 }))
  orb2.position.set(-1.4, -0.7, 0.4)
  scene.add(orb2)

  // Particle field
  const count = 120
  const pGeo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 8
    pos[i * 3 + 1] = (Math.random() - 0.5) * 6
    pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0x0070f3, size: 0.025, transparent: true, opacity: 0.4
  }))
  scene.add(particles)

  resize()
}

function resize() {
  const el = canvasRef.value?.parentElement
  if (!el || !renderer) return
  const w = el.clientWidth
  const h = el.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
}

function animate() {
  animId = requestAnimationFrame(animate)
  const t = Date.now() * 0.001

  // Smooth mouse follow
  targetX += (mouseX * 0.4 - targetX) * 0.06
  targetY += (mouseY * 0.3 - targetY) * 0.06

  // Card tilt follows mouse
  card.rotation.y = targetX * 0.35
  card.rotation.x = targetY * 0.25
  cardEdges.rotation.copy(card.rotation)

  // Orb float
  orb1.position.y = 0.8 + Math.sin(t * 1.2) * 0.15
  orb1.position.x = 1.6 + Math.cos(t * 0.8) * 0.1
  orb2.position.y = -0.7 + Math.sin(t * 0.9 + 1.5) * 0.12
  orb2.position.x = -1.4 + Math.cos(t * 1.1 + 0.8) * 0.1

  // Particles slow drift
  particles.rotation.y = t * 0.03
  particles.rotation.x = t * 0.01

  renderer.render(scene, camera)
}

onMounted(() => {
  buildScene()
  animate()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', resize)
  renderer?.dispose()
})
</script>

<template>
  <div class="relative w-full h-full">
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>
