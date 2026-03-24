<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSiteStore } from '@/stores/useSiteStore';

const site = useSiteStore();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <!-- Section 1: CTA Band -->
    <div v-if="site.ctaLabel" class="cta-band">
      <div class="cta-band__inner">
        <h2 class="cta-band__heading">Ready to get started?</h2>
        <p class="cta-band__text">Let's build something great together.</p>
        <RouterLink :to="site.ctaUrl" class="cta-band__button">
          {{ site.ctaLabel }}
        </RouterLink>
      </div>
    </div>

    <!-- Section 2: Bottom Bar -->
    <div class="bottom-bar">
      <div class="bottom-bar__inner">
        <!-- Legal nav row -->
        <nav v-if="site.legalNav.length" class="bottom-bar__legal">
          <RouterLink
            v-for="item in site.legalNav"
            :key="item.to"
            :to="item.to"
            class="bottom-bar__legal-link"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Copyright + Social row -->
        <div class="bottom-bar__meta">
          <p class="bottom-bar__copyright">
            &copy; {{ year }} {{ site.name }}. All rights reserved.
          </p>
          <div v-if="site.socialLinks.length" class="bottom-bar__social">
            <a
              v-for="link in site.socialLinks"
              :key="link.platform"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bottom-bar__social-link"
            >
              {{ link.platform }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
}

/* ─── Section 1: CTA Band ─── */
.cta-band {
  background-color: #1f2937; /* bg-gray-900 */
  padding: 4rem 1.5rem;
  text-align: center;
}

.cta-band__inner {
  max-width: 48rem; /* max-w-3xl */
  margin: 0 auto;
}

.cta-band__heading {
  font-family: var(--font-heading);
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.cta-band__text {
  font-size: 1.125rem; /* text-lg */
  color: #9ca3af; /* text-gray-400 */
  margin-bottom: 2rem;
}

.cta-band__button {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem; /* py-3 px-8 */
  background-color: #ffffff;
  color: #111827; /* text-gray-900 */
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.75rem; /* rounded-xl */
  transition: background-color 0.2s ease;
}

.cta-band__button:hover {
  background-color: #f3f4f6; /* hover:bg-gray-100 */
  color: #111827;
}

/* ─── Section 2: Bottom Bar ─── */
.bottom-bar {
  background-color: #000000; /* bg-black */
  padding: 1.25rem 1.5rem; /* py-5 px-6 */
}

.bottom-bar__inner {
  max-width: 72rem; /* max-w-6xl */
  margin: 0 auto;
}

/* Legal nav row */
.bottom-bar__legal {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25rem; /* gap-5 */
  margin-bottom: 0.75rem;
}

.bottom-bar__legal-link {
  font-size: 0.75rem; /* text-xs */
  color: #9ca3af; /* text-gray-400 — 4.7:1 on #000 */
  transition: color 0.2s ease;
}

.bottom-bar__legal-link:hover {
  color: #d1d5db; /* hover:text-gray-300 */
}

/* Copyright + Social row */
.bottom-bar__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.bottom-bar__copyright {
  font-size: 0.875rem; /* text-sm */
  color: #9ca3af; /* text-gray-400 — 4.7:1 on #000 */
}

.bottom-bar__social {
  display: flex;
  gap: 1.25rem; /* gap-5 */
}

.bottom-bar__social-link {
  font-size: 0.875rem; /* text-sm */
  color: #9ca3af; /* text-gray-400 — 4.7:1 on #000 */
  transition: color 0.2s ease;
}

.bottom-bar__social-link:hover {
  color: #e5e7eb; /* hover:text-gray-200 */
}

@media (max-width: 768px) {
  .cta-band__heading {
    font-size: 1.5rem;
  }

  .bottom-bar__meta {
    flex-direction: column;
    text-align: center;
  }
}
</style>
