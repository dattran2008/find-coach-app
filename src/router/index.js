/* eslint-disable implicit-arrow-linebreak */
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// authentication
const UserAuth = () => import('@/pages/auth/UserAuth.vue');

// homepage & error
const Home = () => import(/* webpackChunkName: "home" */ '@/pages/index.vue');
const ErrorPage = () => import('@/layouts/error.vue');

// coaches
const CoachDetail = () =>
  import(/* webpackChunkName: "detail" */ '@/pages/coaches/CoachDetail.vue');
const CoachList = () =>
  import(/* webpackChunkName: "coaches" */ '@/pages/coaches/CoachList.vue');
const CoachRegister = () =>
  import(
    /* webpackChunkName: "register" */ '@/pages/coaches/CoachRegister.vue'
  );

// requests
const ContactCoach = () =>
  import(/* webpackChunkName: "contact" */ '@/pages/requests/ContactCoach.vue');
const RequestsReceived = () =>
  import(/* webpackChunkName: "requests" */ '@/pages/requests/RequestList.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/coaches', component: CoachList },
  {
    path: '/coaches/:id([^\\W]+)', // ([a-z]\\d+) -> character with number
    component: CoachDetail,
    props: true,
    children: [{ path: 'contact', component: ContactCoach }],
  },
  {
    path: '/register',
    component: CoachRegister,
    meta: { requireAuth: true },
    async beforeEnter() {
      await store.dispatch('coaches/fetchCoaches', { isRefresh: true });
      if (store.getters['coaches/isCoach']) {
        return '/coaches';
      }
      return true;
    },
  },
  {
    path: '/requests',
    component: RequestsReceived,
    meta: { requireAuth: true },
  },
  { path: '/auth', component: UserAuth, meta: { requireUnauth: true } },
  { path: '/:notFound(.*)', component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0, behavior: 'smooth' });
      }, 200);
    });
  },
});

// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    return '/auth';
  }
  if (to.meta.requireUnauth && store.getters.isAuthenticated) {
    return '/coaches';
  }
});

export default router;
