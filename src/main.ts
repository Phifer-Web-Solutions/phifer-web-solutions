import { ViteSSG } from 'vite-ssg';
import { createPinia } from 'pinia';
import App from './App.vue';
import routes from './router/routes';
import './assets/styles/main.css';

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition || { top: 0 };
    },
  },
  ({ app, isClient }) => {
    const pinia = createPinia();
    app.use(pinia);

    // vite-ssg automatically installs @unhead/vue — no manual createHead() needed

    // Space key → activate links (keyboard accessibility, client only)
    if (isClient) {
      document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && e.target instanceof HTMLAnchorElement) {
          e.preventDefault();
          e.target.click();
        }
      });
    }
  },
);
