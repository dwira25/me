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
    <p class="text-[10px] tracking-[0.3em] uppercase text-[#888] mb-4">{{ eyebrow }}</p>
    <div class="h-px w-8 bg-[#c0392b] mb-6" :class="align === 'center' ? 'mx-auto' : ''"></div>
    <h2 class="font-display text-3xl font-bold text-[#1a1a1a] sm:text-4xl leading-snug">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-sm leading-relaxed text-[#666] max-w-xl" :class="align === 'center' ? 'mx-auto' : ''">
      {{ subtitle }}
    </p>
  </div>
</template>
