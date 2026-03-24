<script setup>
import { ref, computed } from 'vue';
import { useSiteStore } from '@/stores/useSiteStore';
import { useSanity } from '@/composables/useSanity';

const site = useSiteStore();

const { data: page } = useSanity(`*[_type == "page" && slug.current == "/contact"][0]{contactIntroText, contactEmail, contactPhone, contactResponseTime, faqHeading, faqSubheading, faqs[]{question, answer}, statsHeading, stats[]{value, label, prefix, suffix}}`);

const contactForm = ref({ name: '', email: '', message: '' });
const contactSent = ref(false);
function sendContact() { if (contactForm.value.name && contactForm.value.email) contactSent.value = true; }
const openFaq = ref(null);
function toggleFaq(idx) { openFaq.value = openFaq.value === idx ? null : idx; }

const defaultFaqs = [
  { question: 'How long does a typical project take?', answer: 'Most projects are completed within 4–8 weeks depending on scope. We\'ll give you a clear timeline during our initial consultation.' },
  { question: 'What is included in the pricing?', answer: 'All packages include initial consultation, project planning, full implementation, testing, and a 30-day post-launch support period.' },
  { question: 'Do you work with small businesses?', answer: 'Absolutely. We work with businesses of all sizes, from solo founders to established companies. Our packages are designed to scale.' },
  { question: 'Can I make changes after the project is delivered?', answer: 'Yes — we offer ongoing maintenance retainers and ad-hoc change requests. Just get in touch and we\'ll scope the work for you.' },
  { question: 'How do I get started?', answer: 'Simply reach out via our contact form or give us a call. We\'ll schedule a free discovery call to learn about your goals and recommend the best approach.' },
];
const defaultStats = [
  { value: '12', suffix: '+', label: 'Years in Business' },
  { value: '500', suffix: '+', label: 'Clients Served' },
  { value: '98', suffix: '%', label: 'Satisfaction Rate' },
  { value: '50', suffix: 'M+', label: 'Revenue Generated' },
];

const faqs = computed(() => page.value?.faqs || defaultFaqs);
const stats = computed(() => page.value?.stats || defaultStats);
</script>

<template>
  <main class="page page--contact">

    <!-- Contact -->
    <section class="py-16 px-6 bg-[var(--color-surface)]">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-[var(--color-text)] mb-3">Get In Touch</h2>
          <p class="text-[var(--color-text-secondary)] text-base max-w-xl mx-auto">{{ page?.contactIntroText || 'We\'d love to hear from you. Send us a message and we\'ll get back to you as soon as possible.' }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="space-y-6">
            <div>
              <p class="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Address</p>
              <p class="text-[var(--color-text)] text-sm whitespace-pre-line">{{ site.address || '123 Business Street, Suite 100\nYour City, State 10001' }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Phone</p>
              <p class="text-[var(--color-text)] text-sm">{{ page?.contactPhone || site.contactPhone || '+1 (555) 000-0000' }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Email</p>
              <p class="text-[var(--color-text)] text-sm">{{ page?.contactEmail || site.contactEmail }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">Hours</p>
              <p class="text-[var(--color-text)] text-sm">Monday – Friday, 9am – 5pm</p>
            </div>
            <div class="h-36 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] text-sm mt-2">📍 Map</div>
          </div>
          <div v-if="!contactSent" class="bg-[var(--color-bg)] rounded-2xl p-6 border border-[var(--color-border)] shadow-sm space-y-4">
            <div>
              <label class="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Name</label>
              <input v-model="contactForm.name" type="text" placeholder="Your name" class="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text)] bg-[var(--color-bg)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]" />
            </div>
            <div>
              <label class="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Email</label>
              <input v-model="contactForm.email" type="email" placeholder="your@email.com" class="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text)] bg-[var(--color-bg)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]" />
            </div>
            <div>
              <label class="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Message</label>
              <textarea v-model="contactForm.message" rows="4" placeholder="How can we help?" class="w-full px-3 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text)] bg-[var(--color-bg)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] resize-none"></textarea>
            </div>
            <button @click="sendContact" class="w-full py-3 text-white font-semibold rounded-xl text-sm transition-colors" style="background-color: var(--color-primary)">Send Message</button>
          </div>
          <div v-else class="bg-[var(--color-bg)] rounded-2xl p-6 border border-[var(--color-border)] shadow-sm flex items-center justify-center">
            <div class="text-center">
              <div class="text-4xl mb-3">✅</div>
              <p class="font-semibold text-[var(--color-text)] mb-1">Message sent!</p>
              <p class="text-[var(--color-text-secondary)] text-sm">We'll be in touch shortly.</p>
            </div>
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
              <span class="shrink-0 w-6 h-6 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-xs text-[var(--color-text-secondary)] transition-transform duration-200" :class="openFaq === idx ? 'rotate-45' : ''">+</span>
            </button>
            <div v-if="openFaq === idx" class="pb-5 text-[var(--color-text-secondary)] text-sm leading-relaxed">{{ item.answer }}</div>
          </div>
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
  </main>
</template>
