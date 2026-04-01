import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/pages/Home.vue');
const About = () => import('@/pages/About.vue');
const Contact = () => import('@/pages/Contact.vue');
const PrivacyPolicy = () => import('@/pages/PrivacyPolicy.vue');
const TermsAndConditions = () => import('@/pages/TermsAndConditions.vue');
const Accessibility = () => import('@/pages/Accessibility.vue');
const Services = () => import('@/pages/Services.vue');
const Portfolio = () => import('@/pages/Portfolio.vue');
const ProjectDetail = () => import('@/pages/ProjectDetail.vue');
const TeamProjectDetail = () => import('@/pages/TeamProjectDetail.vue');
const Process = () => import('@/pages/Process.vue');
const Support = () => import('@/pages/Support.vue');
const NotFound = () => import('@/pages/NotFound.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: PrivacyPolicy,
  },
  {
    path: '/terms-and-conditions',
    name: 'Terms & Conditions',
    component: TermsAndConditions,
  },
  {
    path: '/accessibility',
    name: 'Accessibility Statement',
    component: Accessibility,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
  },
  {
    path: '/portfolio/:slug',
    name: 'ProjectDetail',
    component: ProjectDetail,
  },
  {
    path: '/team-projects/:slug',
    name: 'TeamProjectDetail',
    component: TeamProjectDetail,
  },
  {
    path: '/process',
    name: 'Process',
    component: Process,
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
