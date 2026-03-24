<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import { useSanity } from '@/composables/useSanity';

const { data: page } = useSanity(`*[_type == "page" && slug.current == "/support"][0]{splitEyebrow, splitHeading, splitBody, splitCtaLabel, splitCtaUrl, splitImage, splitImageRight, splitFeatures[]{title, description}, features[]{title, description, icon}, faqHeading, faqSubheading, faqs[]{question, answer}}`);

const defaultSplitFeatures = ['Tailored to your specific industry', 'Transparent process from day one', 'Measurable outcomes, not just activity'];
const defaultFeatures = [
  { icon: '✨', title: 'Feature One', description: 'Brief description of this feature.' },
  { icon: '🚀', title: 'Feature Two', description: 'Brief description of this feature.' },
  { icon: '🛡️', title: 'Feature Three', description: 'Brief description of this feature.' },
];
const openFaq = ref(null);
function toggleFaq(idx) { openFaq.value = openFaq.value === idx ? null : idx; }

const defaultFaqs = [
  { question: 'How long does a typical project take?', answer: 'Most projects are completed within 4–8 weeks depending on scope. We\'ll give you a clear timeline during our initial consultation.' },
  { question: 'What is included in the pricing?', answer: 'All packages include initial consultation, project planning, full implementation, testing, and a 30-day post-launch support period.' },
  { question: 'Do you work with small businesses?', answer: 'Absolutely. We work with businesses of all sizes, from solo founders to established companies. Our packages are designed to scale.' },
  { question: 'Can I make changes after the project is delivered?', answer: 'Yes — we offer ongoing maintenance retainers and ad-hoc change requests. Just get in touch and we\'ll scope the work for you.' },
  { question: 'How do I get started?', answer: 'Simply reach out via our contact form or give us a call. We\'ll schedule a free discovery call to learn about your goals and recommend the best approach.' },
];

const splitFeatures = computed(() => page.value?.splitFeatures || defaultSplitFeatures);
const features = computed(() => page.value?.features || defaultFeatures);
const faqs = computed(() => page.value?.faqs || defaultFaqs);
</script>

<template>
  <main class="page page--support">

    <!-- Split Two Column -->
    <section class="py-16 px-6 bg-[var(--color-bg)]">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">{{ page?.splitEyebrow || 'About Us' }}</p>
          <h2 class="text-3xl font-bold text-[var(--color-text)] mb-4 leading-tight">{{ page?.splitHeading || 'Built for Businesses That Mean Business' }}</h2>
          <p class="text-[var(--color-text-secondary)] text-base leading-relaxed mb-6">{{ page?.splitBody || 'We combine deep industry expertise with modern thinking to deliver results that last. Our team works alongside yours — understanding your goals, your customers, and your challenges before we ever propose a solution.' }}</p>
          <ul v-if="splitFeatures.length" class="space-y-2 mb-8">
            <li v-for="(f, i) in splitFeatures" :key="i" class="flex items-start gap-2 text-sm text-[var(--color-text)]">
              <span class="font-bold mt-0.5 text-[var(--color-primary)]">✓</span> {{ typeof f === 'string' ? f : f.title }}
            </li>
          </ul>
          <RouterLink :to="page?.splitCtaUrl || '/contact'" class="inline-block text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors" style="background-color: var(--color-primary)">{{ page?.splitCtaLabel || 'Learn More' }}</RouterLink>
        </div>
        <div class="flex-1 min-w-0">
          <div class="aspect-[4/3] rounded-2xl flex items-center justify-center text-5xl shadow-sm" style="background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, transparent), color-mix(in srgb, var(--color-secondary) 14%, transparent))">🏢</div>
        </div>
      </div>
    </section>

    <!-- Feature Grid -->
    <section class="py-16 px-6 bg-[var(--color-bg)]">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(feature, i) in features" :key="i" class="text-center p-6">
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-lg font-semibold text-[var(--color-text)] mb-2">{{ feature.title }}</h3>
          <p class="text-[var(--color-text-secondary)] text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 px-6 bg-[var(--color-bg)]">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-[var(--color-text)] mb-3">{{ page?.faqHeading || 'Frequently Asked Questions' }}</h2>
          <p class="text-[var(--color-text-secondary)] text-base">{{ page?.faqSubheading || 'Everything you need to know. Can\'t find an answer? Reach out to our team.' }}</p>
        </div>
        <div class="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          <div v-for="(item, idx) in faqs" :key="idx">
            <button class="w-full flex items-center justify-between py-5 text-left gap-4" @click="toggleFaq(idx)">
              <span class="font-medium text-[var(--color-text)] text-sm md:text-base">{{ item.question }}</span>
              <span class="shrink-0 w-6 h-6 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-xs text-[var(--color-text-secondary)] transition-transform duration-200" :class="openFaq === idx ? 'rotate-45' : ''">+</span>
            </button>
            <div v-if="openFaq === idx" class="pb-5 text-[var(--color-text-secondary)] text-sm leading-relaxed">{{ item.answer }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
