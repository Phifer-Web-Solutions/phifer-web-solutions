import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    async includedRoutes(paths) {
      // Static routes from the router
      const staticRoutes = [
        '/',
        '/about',
        '/contact',
        '/services',
        '/portfolio',
        '/process',
        '/support',
        '/privacy-policy',
        '/terms-and-conditions',
        '/accessibility',
      ];

      // Fetch dynamic project slugs from Sanity at build time
      const projectId = process.env.VITE_SANITY_PROJECT_ID || 'hq416ys1';
      const dataset = process.env.VITE_SANITY_DATASET || 'production';
      let dynamicRoutes: string[] = [];

      try {
        const base = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}`;

        const casesQuery = encodeURIComponent(
          '*[_type == "caseStudy" && !(_id in path("drafts.**"))]{"slug": slug.current}'
        );
        const teamQuery = encodeURIComponent(
          '*[_type == "teamProject" && !(_id in path("drafts.**"))]{"slug": slug.current}'
        );

        const [casesRes, teamRes] = await Promise.all([
          fetch(`${base}?query=${casesQuery}`).then((r) => r.json()),
          fetch(`${base}?query=${teamQuery}`).then((r) => r.json()),
        ]);

        const caseRoutes = (casesRes.result || [])
          .filter((p: any) => p.slug)
          .map((p: any) => `/portfolio/${p.slug}`);

        const teamRoutes = (teamRes.result || [])
          .filter((p: any) => p.slug)
          .map((p: any) => `/team-projects/${p.slug}`);

        dynamicRoutes = [...caseRoutes, ...teamRoutes];
        console.log(`[SSG] Prerendering ${dynamicRoutes.length} dynamic project routes`);
      } catch (e) {
        console.warn('[SSG] Failed to fetch dynamic routes, skipping:', e);
      }

      return [...staticRoutes, ...dynamicRoutes];
    },
  },
});
