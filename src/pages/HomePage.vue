<script setup lang="ts">
import SeoHead from '@/components/seo/SeoHead.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useSiteStore } from '@/stores/useSiteStore';

const site = useSiteStore();
</script>

<template>
  <SeoHead
    :title="`${site.name} | Home`"
    :description="`${site.name} — ${site.tagline}`"
  />
  <main>
    <!-- Hero Section -->
    <BaseSection>
      <div class="hero">
        <h1 class="hero__title">{{ site.name }}</h1>
        <p class="hero__tagline">{{ site.tagline }}</p>
        <div class="hero__actions">
          <BaseButton variant="primary" size="lg">Get Started</BaseButton>
          <BaseButton variant="outline" size="lg">Learn More</BaseButton>
        </div>
      </div>
    </BaseSection>

    <!-- Content Blocks — scaffolder will add more sections here -->
  </main>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero__title {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.hero__tagline {
  font-size: 1.25rem;
  color: var(--color-text-secondary, var(--color-text));
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
