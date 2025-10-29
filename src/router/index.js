import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/trainings',
      name: 'TrainingsList',
      component: () => import('@/views/TrainingsList.vue')
    },
    {
      path: '/trainings/:id',
      name: 'TrainingDetail',
      component: () => import('@/views/TrainingDetail.vue'),
      props: true
    },
    {
      path: '/participants',
      name: 'ParticipantsList',
      component: () => import('@/views/ParticipantsList.vue')
    },
    {
      path: '/participants/:id',
      name: 'ParticipantDetail',
      component: () => import('@/views/ParticipantDetail.vue'),
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
