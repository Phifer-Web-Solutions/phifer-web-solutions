<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import { useSiteStore } from '@/stores/useSiteStore';
import { useSanity } from '@/composables/useSanity';

const site = useSiteStore();

const { data: page } = useSanity(`*[_type == "page" && slug.current == "/services"][0]{heroTitle, heroSubtitle, heroImage, heroCta{label, url}, features[]{title, description, icon}, pricingHeading, pricingSubheading, plans[]{name, price, period, description, features, highlighted, ctaLabel, ctaUrl}, processHeading, processSubheading, steps[]{title, description, icon}, faqHeading, faqSubheading, faqs[]{question, answer}, testimonialsHeading, testimonials[]{quote, author, role, rating}}`);

const defaultFeatures = [
  { icon: '✨', title: 'Feature One', description: 'Brief description of this feature.' },
  { icon: '🚀', title: 'Feature Two', description: 'Brief description of this feature.' },
  { icon: '🛡️', title: 'Feature Three', description: 'Brief description of this feature.' },
];
const defaultPlans = [
  { name: 'Starter', price: '$999', period: 'one-time', description: 'Everything you need to launch your online presence.', features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup', '30-day support'], cta: 'Get Started', highlighted: false },
  { name: 'Growth', price: '$2,499', period: 'one-time', description: 'Advanced features for businesses ready to scale.', features: ['Up to 15 pages', 'CMS integration', 'Blog or news section', 'Analytics setup', 'Email integration', '90-day support'], cta: 'Get Started', highlighted: true },
  { name: 'Enterprise', price: 'Custom', description: 'Fully tailored solutions for complex requirements.', features: ['Unlimited pages', 'Custom integrations', 'Advanced automation', 'Dedicated account manager', 'Priority support'], cta: 'Contact Us', highlighted: false },
];
const defaultSteps = [
  { icon: '📋', title: 'Discovery Call', description: 'We learn about your goals, challenges, and what success looks like for your business.' },
  { icon: '🗺️', title: 'Strategy & Plan', description: 'We build a tailored roadmap with clear milestones, timelines, and deliverables.' },
  { icon: '⚙️', title: 'Implementation', description: 'Our team executes with precision, keeping you informed at every step of the process.' },
  { icon: '🚀', title: 'Launch & Grow', description: 'We go live, measure results, and continuously optimise to drive ongoing growth.' },
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
const defaultTestimonials = [
  { name: 'Sarah Mitchell', title: 'CEO, Brightline Co.', quote: 'Working with this team completely transformed how we operate. The results exceeded every expectation we had going in.', rating: 5 },
  { name: 'James Okafor', title: 'Director of Operations, Nexus Group', quote: 'Exceptional service from start to finish. They listened carefully, delivered on time, and were a pleasure to work with throughout.', rating: 5 },
  { name: 'Priya Nair', title: 'Founder, Stellar Retail', quote: 'I was sceptical at first, but the outcome speaks for itself. Our revenue grew 40% in the first quarter after launch.', rating: 5 },
];

const features = computed(() => page.value?.features || defaultFeatures);
const plans = computed(() => page.value?.plans || defaultPlans);
const steps = computed(() => page.value?.steps || defaultSteps);
const faqs = computed(() => page.value?.faqs || defaultFaqs);
const testimonials = computed(() => page.value?.testimonials || defaultTestimonials);
</script>

<template>
  <main class="page page--services">

    <!-- Hero Section -->
    <section class="relative text-white" style="background-image: linear-gradient(135deg, var(--color-primary), var(--color-secondary))">
      <div class="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight" style="font-family: var(--font-heading)">{{ page?.heroTitle || site.name }}</h1>
        <p class="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{{ page?.heroSubtitle || site.tagline }}</p>
        <RouterLink
          :to="page?.heroCta?.url || '/contact'"
          class="inline-block bg-white font-semibold px-8 py-3 rounded-lg text-[var(--color-primary)] hover:bg-gray-50 transition-colors"
        >{{ page?.heroCta?.label || 'Get Started' }}</RouterLink>
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

    <!-- Pricing -->
    <section class="py-16 px-6 bg-[var(--color-bg)]">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text)] mb-3">{{ page?.pricingHeading || 'Simple, Transparent Pricing' }}</h2>
          <p class="text-[var(--color-text-secondary)] text-base max-w-xl mx-auto">{{ page?.pricingSubheading || 'No hidden fees. Choose the plan that fits your needs and scale as you grow.' }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div v-for="(tier, i) in plans" :key="i" class="rounded-2xl border p-8 flex flex-col" :class="tier.highlighted ? 'text-white shadow-xl scale-105' : 'border-[var(--color-border)] bg-[var(--color-bg)]'" :style="tier.highlighted ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : {}">
            <div v-if="tier.highlighted" class="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Most Popular</div>
            <h3 class="text-xl font-bold mb-1" :class="tier.highlighted ? 'text-white' : 'text-[var(--color-text)]'">{{ tier.name }}</h3>
            <p class="text-sm mb-4" :class="tier.highlighted ? 'text-white/70' : 'text-[var(--color-text-secondary)]'">{{ tier.description }}</p>
            <div class="mb-6">
              <span class="text-4xl font-extrabold" :class="tier.highlighted ? 'text-white' : 'text-[var(--color-text)]'">{{ tier.price }}</span>
              <span v-if="tier.period" class="text-sm ml-1" :class="tier.highlighted ? 'text-white/60' : 'text-[var(--color-text-secondary)]'">{{ tier.period }}</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li v-for="(f, fi) in tier.features" :key="fi" class="flex items-start gap-2 text-sm">
                <span :style="tier.highlighted ? 'color: rgba(255,255,255,0.65)' : 'color: var(--color-primary)'">✓</span>
                <span :class="tier.highlighted ? 'text-white/80' : 'text-[var(--color-text)]'">{{ f }}</span>
              </li>
            </ul>
            <RouterLink :to="tier.ctaUrl || '/contact'" class="block text-center py-3 rounded-xl font-semibold text-sm transition-colors" :class="tier.highlighted ? 'bg-white hover:bg-gray-50' : 'text-white'" :style="tier.highlighted ? { color: 'var(--color-primary)' } : { backgroundColor: 'var(--color-primary)' }">{{ tier.ctaLabel || tier.cta || 'Get Started' }}</RouterLink>
          </div>
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
              <span class="shrink-0 w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-lg font-medium text-[var(--color-text-secondary)] transition-transform duration-200" :class="openFaq === idx ? 'rotate-45' : ''">+</span>
            </button>
            <div v-if="openFaq === idx" class="pb-5 text-[var(--color-text-secondary)] text-sm leading-relaxed">{{ item.answer }}</div>
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
