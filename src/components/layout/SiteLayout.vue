<script setup lang="ts">
import { watch } from 'vue';
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import { useSeo } from '@/composables/useSeo';
import { useSanity } from '@/composables/useSanity';
import { useSiteStore } from '@/stores/useSiteStore';

useSeo();

// Fetch site settings and navigation from Sanity, sync into the Pinia store
const site = useSiteStore();

// ── Site Settings ──
interface SiteSettings {
  siteName?: string;
  logo?: { asset?: { url?: string } };
  ctaLabel?: string;
  ctaUrl?: string;
  ctaHeadline?: string;
  ctaSubtext?: string;
  ctaFooterLabel?: string;
  ctaFooterUrl?: string;
  copyrightText?: string;
}

const { data: settings } = useSanity<SiteSettings>(
  `*[_type == "siteSettings"][0]{
    siteName,
    "logo": logo{asset->{url}},
    ctaLabel,
    ctaUrl,
    ctaHeadline,
    ctaSubtext,
    ctaFooterLabel,
    ctaFooterUrl,
    copyrightText
  }`
);

watch(settings, (s) => {
  if (!s) return;
  if (s.siteName) site.name = s.siteName;
  if (s.logo?.asset?.url) site.logo = s.logo.asset.url;
  if (s.ctaLabel) site.ctaLabel = s.ctaLabel;
  if (s.ctaUrl) site.ctaUrl = s.ctaUrl;
  if (s.ctaHeadline) site.ctaHeadline = s.ctaHeadline;
  if (s.ctaSubtext) site.ctaSubtext = s.ctaSubtext;
  if (s.ctaFooterLabel) site.ctaFooterLabel = s.ctaFooterLabel;
  if (s.ctaFooterUrl) site.ctaFooterUrl = s.ctaFooterUrl;
  if (s.copyrightText) site.copyrightText = s.copyrightText;
});

// ── Navigation ──
interface NavItem { label: string; url: string; isExternal?: boolean }
interface NavDoc { navType: string; items: NavItem[] }

const { data: navDocs } = useSanity<NavDoc[]>(
  `*[_type == "navigation"]{navType, items[]{label, url, isExternal}}`
);

watch(navDocs, (docs) => {
  if (!docs) return;
  for (const doc of docs) {
    const items = (doc.items || []).map((i) => ({ label: i.label, to: i.url }));
    if (doc.navType === 'main' && items.length) site.primaryNav = items;
    if (doc.navType === 'footer' && items.length) site.footerNav = items;
    if (doc.navType === 'legal' && items.length) site.legalNav = items;
  }
});
</script>

<template>
  <div class="site-layout">
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
</style>
