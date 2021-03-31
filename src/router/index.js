import { createRouter, createWebHistory } from 'vue-router';
// homepage
import Home from '@/pages/index.vue';

// coaches
import CoachDetail from '@/pages/coaches/CoachDetail.vue';
import CoachList from '@/pages/coaches/CoachList.vue';
import CoachRegister from '@/pages/coaches/CoachRegister.vue';

// requests
import ContactCoach from '@/pages/requests/ContactCoach.vue';
import RequestsReceived from '@/pages/requests/RequestsReceived.vue';

import ErrorPages from '@/pages/error.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/coaches', component: CoachList },
  {
    path: '/coaches/:id',
    component: CoachDetail,
    props: true,
    children: [{ path: 'contact', component: ContactCoach }],
  },
  { path: '/register', component: CoachRegister },
  {
    path: '/about',
    name: 'About',
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/About.vue'),
  },
  { path: '/requests', component: RequestsReceived },
  { path: '/:notFound(.*)', component: ErrorPages },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
