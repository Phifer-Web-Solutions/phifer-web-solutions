import { defineStore } from 'pinia';
import type { SiteConfig } from '@/types/site';

export const useSiteStore = defineStore('site', {
  state: (): SiteConfig => ({
    name: 'Phifer Web Solutions',
    tagline: '',
    contactEmail: 'eric@ericphiferllc.com',
    contactPhone: '',
    address: '',
    ctaLabel: 'Get Started',
    ctaUrl: '/contact',
    primaryNav: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Services', to: '/services' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Process', to: '/process' },
    ],
    footerNav: [
      { label: 'Support', to: '/support' },
    ],
    legalNav: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
      { label: 'Accessibility Statement', to: '/accessibility' },
    ],
    socialLinks: [],
  }),
});
