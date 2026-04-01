<script setup>
import { useSanity } from '@/composables/useSanity';
import { sectionMap, pageQuery } from '@/composables/useSections';
import { useRevealObserver } from '@/composables/useRevealObserver';
import SectionDivider from '@/components/ui/SectionDivider.vue';

const { data: page } = useSanity(pageQuery('/'));
useRevealObserver(page);
</script>

<template>
  <main class="page page--home">
    <template v-for="(section, idx) in (page?.sections || [])" :key="section._key">
      <SectionDivider
        v-if="idx > 0"
        :fill="section._type === 'statsSection' ? 'var(--color-primary)' : section._type === 'processSteps' ? 'var(--color-surface)' : 'var(--color-bg)'"
        :flip="idx % 2 === 0"
      />
      <component :is="sectionMap[section._type]" v-if="sectionMap[section._type]" :section="section" />
    </template>
  </main>
</template>
