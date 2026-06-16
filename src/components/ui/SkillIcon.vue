<script setup>
const props = defineProps({
  name: { type: String, required: true },
})

const icons = {
  'clipboard-check': 'M9 4h6v2H9V4zM6 6h12v15H6V6z M9.5 13.5l2 2 4-4',
  chart: 'M4 19h16 M7 19V11 M12 19V6 M17 19V14',
  grid: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
  workflow: 'M17 2l4 4-4 4 M21 6H8a4 4 0 00-4 4v1 M7 22l-4-4 4-4 M3 18h13a4 4 0 004-4v-1',
  link: 'M9 12a4 4 0 014-4h3a4 4 0 010 8h-1 M15 12a4 4 0 01-4 4H8a4 4 0 010-8h1',
  code: 'M9 4L3 12l6 8 M15 4l6 8-6 8',
  database: 'M4 5a8 3 0 1 0 16 0a8 3 0 1 0 -16 0 M4 5v6a8 3 0 0 0 16 0V5 M4 11v6a8 3 0 0 0 16 0v-6',
  truck: 'M1 7h11v8H1z M12 10h4l3 3v2h-7z M5 19a2 2 0 100-4 2 2 0 000 4z M17 19a2 2 0 100-4 2 2 0 000 4z',
  sparkles: 'M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z M19 14l.8 2.4L22 17l-2.2.6L19 20l-.8-2.4L16 17l2.2-.6L19 14z',
  book: 'M12 6c-2-1.5-5-2-8-1v13c3-1 6-0.5 8 1c2-1.5 5-2 8-1V5c-3-1-6-0.5-8 1z M12 6v13',
  'badge-check': 'M12 2l2.4 1.2 2.6.2 1.2 2.4 2.2 1.6-.5 2.6.5 2.6-2.2 1.6-1.2 2.4-2.6.2L12 22l-2.4-1.2-2.6-.2-1.2-2.4-2.2-1.6.5-2.6-.5-2.6 2.2-1.6 1.2-2.4 2.6-.2z M8.5 12.5l2.5 2.5 4.5-5',
  apps: 'M5 5h2v2H5z M11 5h2v2h-2z M17 5h2v2h-2z M5 11h2v2H5z M11 11h2v2h-2z M17 11h2v2h-2z M5 17h2v2H5z M11 17h2v2h-2z M17 17h2v2h-2z',
  layers: 'M12 2l9 5-9 5-9-5 9-5z M3 12l9 5 9-5 M3 17l9 5 9-5',
  'shield-check': 'M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z M9 12l2 2 4-4',
  'map-pin': 'M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z M12 7a3 3 0 100 6 3 3 0 000-6z',
}

const path = icons[props.name] ?? icons.sparkles
</script>

<template>
  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path :d="path" />
  </svg>
</template>
