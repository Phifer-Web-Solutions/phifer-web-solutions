<script setup lang="ts">
import SeoHead from '@/components/seo/SeoHead.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import { useSiteStore } from '@/stores/useSiteStore';

const site = useSiteStore();
</script>

<template>
  <SeoHead
    :title="`Privacy Policy | ${site.name}`"
    :description="`Privacy policy for ${site.name}.`"
  />
  <main>
    <BaseSection narrow>
      <h1>Privacy Policy</h1>
      <!-- Scaffolder injects legal content here -->
    </BaseSection>
  </main>
</template>
