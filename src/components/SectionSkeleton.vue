<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'text',
  },
})
</script>

<template>
  <section class="page-skeleton" aria-hidden="true">
    <div
      v-if="variant === 'hero'"
      class="skeleton-band hero"
    >
      <div class="skeleton-lines" style="position:absolute; left:1.1rem; right:1.1rem; bottom:1.1rem;">
        <div class="skeleton-line wide" />
        <div class="skeleton-line med" />
        <div class="skeleton-line short" />
      </div>
    </div>

    <div
      v-else-if="variant === 'grid'"
      class="skeleton-band section"
      style="min-height: 16rem"
    >
      <div class="skeleton-lines">
        <div class="skeleton-line wide" />
        <div class="skeleton-line med" />
        <div class="skeleton-grid">
          <div class="skeleton-card" />
          <div class="skeleton-card" />
        </div>
      </div>
    </div>

    <div
      v-else-if="variant === 'contact'"
      class="skeleton-band section"
      style="min-height: 12rem"
    >
      <div class="skeleton-lines">
        <div class="skeleton-line med" />
        <div class="skeleton-line wide" />
        <div class="skeleton-line short" />
        <div class="skeleton-grid">
          <div class="skeleton-card" style="min-height: 3rem" />
          <div class="skeleton-card" style="min-height: 3rem" />
        </div>
      </div>
    </div>

    <div
      v-else
      class="skeleton-band section"
      style="min-height: 14rem"
    >
      <div class="skeleton-lines">
        <div class="skeleton-line wide" />
        <div class="skeleton-line med" />
        <div class="skeleton-line short" />
        <div class="skeleton-grid">
          <div class="skeleton-card" />
          <div class="skeleton-card" />
        </div>
      </div>
    </div>
  </section>
</template>
