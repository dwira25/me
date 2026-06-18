<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="py-8 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5 flex items-center justify-between">
      <span class="text-sm font-semibold tracking-tight" style="color: var(--text)">DNS</span>
      <p class="text-xs font-mono" style="color: var(--text-3)">© {{ year }} Dwira Naufal Siregar</p>
    </div>
  </footer>
</template>
