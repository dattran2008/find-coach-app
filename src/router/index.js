/* eslint-disable implicit-arrow-linebreak */
import { createRouter, createWebHistory } from 'vue-router';

// homepage & error
const Home = () => import(/* webpackChunkName: "home" */ '@/pages/index.vue');
const ErrorPages = () => import('@/pages/error.vue');

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
    path: '/coaches/:id([a-z]\\d+)',
    component: CoachDetail,
    props: true,
    children: [{ path: 'contact', component: ContactCoach }],
  },
  { path: '/register', component: CoachRegister },
  { path: '/requests', component: RequestsReceived },
  { path: '/:notFound(.*)', component: ErrorPages },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
