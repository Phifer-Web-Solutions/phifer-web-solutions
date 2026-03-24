export interface NavItem {
  label: string;
  to: string;
}

export interface PageMeta {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  ctaLabel: string;
  ctaUrl: string;
  primaryNav: NavItem[];
  footerNav: NavItem[];
  legalNav: NavItem[];
  socialLinks: { platform: string; url: string }[];
}
