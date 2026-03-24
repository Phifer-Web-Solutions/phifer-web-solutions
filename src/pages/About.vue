<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useSanity } from '@/composables/useSanity';

const { data: page } = useSanity(`*[_type == "page" && slug.current == "/about"][0]{splitEyebrow, splitHeading, splitBody, splitCtaLabel, splitCtaUrl, splitImage, splitImageRight, splitFeatures[]{title, description}, statsHeading, stats[]{value, label, prefix, suffix}, features[]{title, description, icon}, processHeading, processSubheading, steps[]{title, description, icon}, testimonialsHeading, testimonials[]{quote, author, role, rating}}`);

const defaultSplitFeatures = ['Tailored to your specific industry', 'Transparent process from day one', 'Measurable outcomes, not just activity'];
const defaultStats = [
  { value: '12', suffix: '+', label: 'Years in Business' },
  { value: '500', suffix: '+', label: 'Clients Served' },
  { value: '98', suffix: '%', label: 'Satisfaction Rate' },
  { value: '50', suffix: 'M+', label: 'Revenue Generated' },
];
const defaultFeatures = [
  { icon: '✨', title: 'Feature One', description: 'Brief description of this feature.' },
  { icon: '🚀', title: 'Feature Two', description: 'Brief description of this feature.' },
  { icon: '🛡️', title: 'Feature Three', description: 'Brief description of this feature.' },
];
const defaultSteps = [
  { icon: '📋', title: 'Discovery Call', description: 'We learn about your goals, challenges, and what success looks like for your business.' },
  { icon: '🗺️', title: 'Strategy & Plan', description: 'We build a tailored roadmap with clear milestones, timelines, and deliverables.' },
  { icon: '⚙️', title: 'Implementation', description: 'Our team executes with precision, keeping you informed at every step of the process.' },
  { icon: '🚀', title: 'Launch & Grow', description: 'We go live, measure results, and continuously optimise to drive ongoing growth.' },
];
const defaultTestimonials = [
  { name: 'Sarah Mitchell', title: 'CEO, Brightline Co.', quote: 'Working with this team completely transformed how we operate. The results exceeded every expectation we had going in.', rating: 5 },
  { name: 'James Okafor', title: 'Director of Operations, Nexus Group', quote: 'Exceptional service from start to finish. They listened carefully, delivered on time, and were a pleasure to work with throughout.', rating: 5 },
  { name: 'Priya Nair', title: 'Founder, Stellar Retail', quote: 'I was sceptical at first, but the outcome speaks for itself. Our revenue grew 40% in the first quarter after launch.', rating: 5 },
];

const splitFeatures = computed(() => page.value?.splitFeatures || defaultSplitFeatures);
const stats = computed(() => page.value?.stats || defaultStats);
const features = computed(() => page.value?.features || defaultFeatures);
const steps = computed(() => page.value?.steps || defaultSteps);
const testimonials = computed(() => page.value?.testimonials || defaultTestimonials);
</script>

<template>
  <main class="page page--about">

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

    <!-- Stats -->
    <section class="py-14 px-6 text-white" style="background-color: var(--color-primary)">
      <div class="max-w-5xl mx-auto">
        <h2 v-if="page?.statsHeading" class="text-3xl font-bold text-center mb-10">{{ page.statsHeading }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="(s, i) in stats" :key="i">
            <p class="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
              <span v-if="s.prefix">{{ s.prefix }}</span>{{ s.value }}<span v-if="s.suffix" class="text-2xl md:text-3xl">{{ s.suffix }}</span>
            </p>
            <p class="text-white/70 text-sm font-medium uppercase tracking-wide">{{ s.label }}</p>
          </div>
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

    <!-- Process -->
    <section class="py-16 px-6 bg-[var(--color-surface)]">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text)] mb-3">{{ page?.processHeading || 'How It Works' }}</h2>
          <p class="text-[var(--color-text-secondary)] text-base max-w-xl mx-auto">{{ page?.processSubheading || 'A simple, proven process designed to get you results without the guesswork.' }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-0">
          <div v-for="(step, idx) in steps" :key="idx" class="relative flex flex-col items-center text-center px-4">
            <div v-if="idx < steps.length - 1" class="hidden md:block absolute top-8 w-full h-0.5" style="left: 50%; background-color: color-mix(in srgb, var(--color-primary) 20%, transparent)"></div>
            <div class="relative z-10 w-16 h-16 rounded-full bg-[var(--color-bg)] border-2 flex items-center justify-center text-2xl mb-4 shadow-sm" style="border-color: color-mix(in srgb, var(--color-primary) 35%, transparent)">{{ step.icon }}</div>
            <div class="absolute top-0 right-6 md:right-4 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center z-20 bg-[var(--color-primary)]">{{ idx + 1 }}</div>
            <h3 class="font-semibold text-[var(--color-text)] mb-2">{{ step.title }}</h3>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 px-6 bg-[var(--color-bg)]">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text)]">{{ page?.testimonialsHeading || 'What Our Clients Say' }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(t, i) in testimonials" :key="i" class="flex flex-col bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
            <div class="flex gap-0.5 mb-4">
              <span v-for="n in (t.rating ?? 5)" :key="n" class="text-amber-400 text-sm">★</span>
            </div>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1 mb-6">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style="background-color: color-mix(in srgb, var(--color-primary) 10%, transparent); color: var(--color-primary)">{{ (t.author || t.name).charAt(0) }}</div>
              <div>
                <p class="font-semibold text-[var(--color-text)] text-sm">{{ t.author || t.name }}</p>
                <p class="text-[var(--color-text-secondary)] text-xs">{{ t.role || t.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
