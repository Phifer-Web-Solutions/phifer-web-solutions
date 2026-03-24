<script setup lang="ts">
import SeoHead from '@/components/seo/SeoHead.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import { useSiteStore } from '@/stores/useSiteStore';

const site = useSiteStore();
</script>

<template>
  <SeoHead
    :title="`About | ${site.name}`"
    :description="`Learn more about ${site.name}.`"
  />
  <main>
    <BaseSection narrow>
      <h1>About {{ site.name }}</h1>
      <!-- Content — scaffolder will fill in or connect to CMS -->
      <p>Tell your story here.</p>
    </BaseSection>
  </main>
</template>
