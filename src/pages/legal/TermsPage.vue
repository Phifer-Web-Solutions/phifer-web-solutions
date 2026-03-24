<script setup lang="ts">
import SeoHead from '@/components/seo/SeoHead.vue';
import BaseSection from '@/components/ui/BaseSection.vue';
import { useSiteStore } from '@/stores/useSiteStore';

const site = useSiteStore();
</script>

<template>
  <SeoHead
    :title="`Terms & Conditions | ${site.name}`"
    :description="`Terms and conditions for ${site.name}.`"
  />
  <main>
    <BaseSection narrow>
      <h1>Terms & Conditions</h1>
      <!-- Scaffolder injects legal content here -->
    </BaseSection>
  </main>
</template>
