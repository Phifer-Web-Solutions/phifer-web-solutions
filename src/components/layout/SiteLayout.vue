<script setup lang="ts">
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
</script>

<template>
  <div class="site-layout">
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
</style>
