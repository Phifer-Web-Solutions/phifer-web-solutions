<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useSanity } from '@/composables/useSanity';

const { data: page } = useSanity(`*[_type == "page" && slug.current == "/portfolio"][0]{splitEyebrow, splitHeading, splitBody, splitCtaLabel, splitCtaUrl, splitImage, splitImageRight, splitFeatures[]{title, description}, portfolioHeading, portfolioSubheading, testimonialsHeading, testimonials[]{quote, author, role, rating}}`);

const defaultSplitFeatures = ['Tailored to your specific industry', 'Transparent process from day one', 'Measurable outcomes, not just activity'];
const projects = [
  { title: 'Retail Rebrand', category: 'Branding', description: 'Complete identity overhaul for a mid-size retail chain, resulting in 40% higher brand recall.', color: 'from-violet-400 to-purple-600' },
  { title: 'SaaS Launch', category: 'Strategy', description: 'Go-to-market strategy and execution for a B2B SaaS platform — 800 signups in first month.', color: 'from-blue-400 to-indigo-600' },
  { title: 'E-Commerce Scale', category: 'Implementation', description: 'Migrated and optimised a legacy store, cutting page load by 60% and boosting conversions.', color: 'from-emerald-400 to-teal-600' },
  { title: 'Healthcare Portal', category: 'Consulting', description: 'Patient-facing web portal for a regional health network, serving 50,000+ users monthly.', color: 'from-rose-400 to-pink-600' },
  { title: 'Logistics Dashboard', category: 'Analytics', description: 'Real-time operations dashboard with custom KPIs for a national freight company.', color: 'from-amber-400 to-orange-600' },
  { title: 'Non-Profit Campaign', category: 'Strategy', description: 'Digital fundraising campaign that exceeded the target by 220% in eight weeks.', color: 'from-cyan-400 to-sky-600' },
];
const defaultTestimonials = [
  { name: 'Sarah Mitchell', title: 'CEO, Brightline Co.', quote: 'Working with this team completely transformed how we operate. The results exceeded every expectation we had going in.', rating: 5 },
  { name: 'James Okafor', title: 'Director of Operations, Nexus Group', quote: 'Exceptional service from start to finish. They listened carefully, delivered on time, and were a pleasure to work with throughout.', rating: 5 },
  { name: 'Priya Nair', title: 'Founder, Stellar Retail', quote: 'I was sceptical at first, but the outcome speaks for itself. Our revenue grew 40% in the first quarter after launch.', rating: 5 },
];

const splitFeatures = computed(() => page.value?.splitFeatures || defaultSplitFeatures);
const testimonials = computed(() => page.value?.testimonials || defaultTestimonials);
</script>

<template>
  <main class="page page--portfolio">

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

    <!-- Portfolio -->
    <section class="py-16 px-6 bg-[var(--color-surface)]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text)] mb-3">{{ page?.portfolioHeading || 'Our Work' }}</h2>
          <p class="text-[var(--color-text-secondary)] text-base max-w-2xl mx-auto">{{ page?.portfolioSubheading || 'A selection of projects we\'re proud of. Each one solved a real problem for a real client.' }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(p, i) in projects" :key="i" class="group bg-[var(--color-bg)] rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow">
            <div :class="'bg-gradient-to-br ' + p.color + ' h-40 flex items-end p-4'">
              <span class="text-xs font-semibold text-white/80 bg-black/20 px-2 py-0.5 rounded-full">{{ p.category }}</span>
            </div>
            <div class="p-5">
              <h3 class="font-bold text-[var(--color-text)] mb-2">{{ p.title }}</h3>
              <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">{{ p.description }}</p>
            </div>
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
