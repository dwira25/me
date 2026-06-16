<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
let renderer, scene, camera, animationId
let particles, particleGeo
let icosahedron
let warpLines = []
let helixPoints = []
let mouseX = 0, mouseY = 0

const CYAN   = 0x22d3ee
const BLUE   = 0x3b82f6
const VIOLET = 0x8b5cf6
const palette = [new THREE.Color(CYAN), new THREE.Color(BLUE), new THREE.Color(VIOLET)]

function buildParticles() {
  const count = 2000
  particleGeo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 14
    pos[i*3+1] = (Math.random() - 0.5) * 14
    pos[i*3+2] = (Math.random() - 0.5) * 8
    const c = palette[i % 3]
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  particleGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
    size: 0.025, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true
  }))
  scene.add(particles)
}

function buildIcosahedron() {
  icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.2, 1),
    new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.06 })
  )
  scene.add(icosahedron)
}

function buildWarpLines() {
  for (let i = 0; i < 80; i++) {
    const y = (Math.random() - 0.5) * 12
    const z = (Math.random() - 0.5) * 6
    const len = 1.5 + Math.random() * 3
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, y, z),
      new THREE.Vector3(-8 + len, y, z)
    ])
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: CYAN, transparent: true, opacity: 0.04
    }))
    line.userData.speed = 0.02 + Math.random() * 0.05
    line.userData.len = len
    warpLines.push(line)
    scene.add(line)
  }
}

function buildDNAHelix() {
  const total = 60
  const cyanMat  = new THREE.MeshBasicMaterial({ color: CYAN })
  const violetMat = new THREE.MeshBasicMaterial({ color: VIOLET })
  const geo = new THREE.SphereGeometry(0.04, 6, 6)
  for (let i = 0; i < total; i++) {
    const t = (i / total) * Math.PI * 6
    const x = Math.cos(t) * 0.5
    const x2 = Math.cos(t + Math.PI) * 0.5
    const y = (i / total) * 5 - 2.5
    const z = Math.sin(t) * 0.5
    const z2 = Math.sin(t + Math.PI) * 0.5

    const m1 = new THREE.Mesh(geo, i % 2 === 0 ? cyanMat : violetMat)
    m1.position.set(x, y, z)
    const m2 = new THREE.Mesh(geo, i % 2 === 0 ? violetMat : cyanMat)
    m2.position.set(x2, y, z2)

    helixPoints.push(m1, m2)
    scene.add(m1, m2)
  }
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  const t = Date.now() * 0.0003

  particles.rotation.y = t * 0.04
  particles.rotation.x = t * 0.015

  icosahedron.rotation.y += 0.0015
  icosahedron.rotation.x += 0.0008

  // Warp lines: move left→right, wrap around
  for (const line of warpLines) {
    const pos = line.geometry.attributes.position
    pos.array[0] += line.userData.speed
    pos.array[3] += line.userData.speed
    if (pos.array[0] > 8) {
      pos.array[0] = -8
      pos.array[3] = -8 + line.userData.len
    }
    pos.needsUpdate = true
  }

  // DNA helix rotation around Y axis
  const helixGroup_angle = t * 0.3
  const total = helixPoints.length / 2
  for (let i = 0; i < total; i++) {
    const base_t = (i / total) * Math.PI * 6
    const t1 = base_t + helixGroup_angle
    const t2 = t1 + Math.PI

    helixPoints[i*2].position.x   = Math.cos(t1) * 0.5
    helixPoints[i*2].position.z   = Math.sin(t1) * 0.5
    helixPoints[i*2+1].position.x = Math.cos(t2) * 0.5
    helixPoints[i*2+1].position.z = Math.sin(t2) * 0.5
  }

  // Mouse parallax on camera
  camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.04
  camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.04
  camera.lookAt(scene.position)

  renderer.render(scene, camera)
}

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 4

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  buildParticles()
  buildIcosahedron()
  buildWarpLines()
  buildDNAHelix()

  window.addEventListener('resize', onResize)
  animate()
}

onMounted(() => {
  init()
  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)

  particleGeo?.dispose()

  for (const line of warpLines) {
    line.geometry.dispose()
    line.material.dispose()
    scene.remove(line)
  }
  warpLines = []

  for (const m of helixPoints) {
    m.geometry.dispose()
    m.material.dispose()
    scene.remove(m)
  }
  helixPoints = []

  icosahedron?.geometry.dispose()
  icosahedron?.material.dispose()
  particles?.geometry.dispose()
  particles?.material.dispose()

  renderer?.dispose()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>
