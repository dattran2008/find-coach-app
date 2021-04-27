/* eslint-disable implicit-arrow-linebreak */
import { createRouter, createWebHistory } from 'vue-router';

// VueX store
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
  { path: '/register', component: CoachRegister, meta: { requireAuth: true } },
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requireUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
