<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  align: { type: String, default: 'left' },
})
</script>

<template>
  <div :class="['mb-12 md:mb-16', align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl']" v-reveal>
    <span class="section-label">{{ eyebrow }}</span>
    <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
      {{ subtitle }}
    </p>
  </div>
</template>
