<template>
  <!-- Hero ambience layer — sits behind hero content -->
  <div
    v-if="variant === 'hero'"
    class="ambience-hero"
    aria-hidden="true"
  >
    <svg class="ambience-shape" width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
      <rect x="1203" y="-57" width="320" height="320" fill="white" opacity="0.08" transform="rotate(46.1 1363 103)" rx="4" />
      <rect x="83" y="383" width="180" height="180" fill="white" opacity="0.05" transform="rotate(-28.9 173 473)" rx="4" />
    </svg>
  </div>

  <!-- CTA ambience layer — corner accents on CTA blocks -->
  <div
    v-else-if="variant === 'cta'"
    class="ambience-cta"
    aria-hidden="true"
  >
    <svg class="ambience-shape" width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
      <rect x="1320" y="-17" width="100" height="100" fill="white" opacity="0.06" transform="rotate(46.1 1370 33)" rx="4" />
      <rect x="40" y="123" width="60" height="60" fill="white" opacity="0.04" transform="rotate(-28.9 70 153)" rx="3" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{ variant: 'hero' | 'cta' }>()
</script>

<style scoped>
@keyframes ambienceFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.ambience-shape {
  animation: ambienceFloat 16s ease-in-out infinite;
  will-change: transform;
}
.ambience-shape:nth-child(2) {
  animation-delay: -6s;
}

.ambience-hero {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.ambience-cta {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .ambience-shape {
    animation: none;
  }
}
</style>
