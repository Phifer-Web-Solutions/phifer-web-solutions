import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
    title: 'Privacy Policy | Phifer Web Solutions',
    description: 'Privacy Policy - Phifer Web Solutions',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Phifer Web Solutions',
    description: 'Terms & Conditions - Phifer Web Solutions',
  },
  '/accessibility': {
    title: 'Accessibility Statement | Phifer Web Solutions',
    description: 'Accessibility Statement - Phifer Web Solutions',
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
    description: 'From first conversation to launch and beyond — here\'s exactly how working with Phifer Web Solutions looks. No surprises, no hidden steps, no runaround.',
  },
  '/support': {
    title: 'Support',
    description: 'Current Phifer Web Solutions clients can get help here. Whether it\'s a quick fix or an update request, support is part of the plan — not an add-on.',
  },
};

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Phifer Web Solutions",
  "url": "https://phiferwebsolutions.com",
  "email": "eric@ericphiferllc.com"
};

export function useSeo() {
  const route = useRoute();

  const meta = computed(() => pageMeta[route.path] || {
    title: 'Phifer Web Solutions',
    description: 'Phifer Web Solutions',
  });

  const siteName = 'Phifer Web Solutions';

  useHead({
    title: computed(() => {
      const t = meta.value.title;
      return t.includes(siteName) ? t : `${t} | ${siteName}`;
    }),
    meta: [
      { name: 'description', content: computed(() => meta.value.description) },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaJsonLd),
      },
    ],
  });
}
