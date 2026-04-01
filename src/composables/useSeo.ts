import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://phiferwebsolutions.com';
const siteName = 'Phifer Web Solutions';
const defaultImage = `${siteUrl}/og-image.png`;

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Home',
    description: 'Web design and maintenance for nonprofits, churches, and local businesses. Clear, honest pricing. No fluff — just a website that works and stays working.',
  },
  '/about': {
    title: 'About',
    description: 'Eric Phifer builds websites for mission-driven organizations — then keeps them running. Based in Fruita, CO. Solo operation. No middlemen, no surprises.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Ready to talk about your website? Tell us about your organization. No sales pitch — just an honest conversation about what you need and whether we\'re a fit.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How Phifer Web Solutions collects, uses, and protects your personal information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions',
    description: 'Terms of use for the Phifer Web Solutions website.',
  },
  '/accessibility': {
    title: 'Accessibility Statement',
    description: 'Our commitment to digital accessibility and the standards we follow.',
  },
  '/services': {
    title: 'Services',
    description: 'Web design packages for nonprofits, churches, and local businesses — plus ongoing maintenance so your site never falls behind. Built to fit your mission.',
  },
  '/portfolio': {
    title: 'Portfolio',
    description: 'See real websites built for real organizations. Each project is scoped to the client\'s goals, not inflated to add cost. Work that speaks for itself.',
  },
  '/process': {
    title: 'Process',
    description: 'From first conversation to launch and beyond — here\'s exactly how working with Phifer Web Solutions looks. No surprises, no hidden steps.',
  },
  '/support': {
    title: 'Support',
    description: 'Current Phifer Web Solutions clients can get help here. Support is part of the plan — not an add-on.',
  },
};

const schemaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  'name': siteName,
  'url': siteUrl,
  'email': 'eric@ericphiferllc.com',
  'description': 'Web design and maintenance for nonprofits, churches, and local businesses.',
  'image': defaultImage,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Fruita',
    'addressRegion': 'CO',
    'addressCountry': 'US',
  },
  'sameAs': [
    'https://www.facebook.com/phiferwebsolutions',
    'https://www.linkedin.com/company/phifer-web-solutions',
  ],
};

export function useSeo() {
  const route = useRoute();

  const meta = computed(() => pageMeta[route.path] || {
    title: siteName,
    description: 'Purpose-driven web solutions for mission-focused organizations.',
  });

  const fullTitle = computed(() => {
    const t = meta.value.title;
    return t.includes(siteName) ? t : `${t} | ${siteName}`;
  });

  const canonicalUrl = computed(() => `${siteUrl}${route.path === '/' ? '' : route.path}`);

  useHead({
    title: fullTitle,
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
    meta: [
      { name: 'description', content: computed(() => meta.value.description) },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: computed(() => meta.value.description) },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: defaultImage },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: computed(() => meta.value.description) },
      { name: 'twitter:image', content: defaultImage },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaJsonLd),
      },
    ],
  });
}
