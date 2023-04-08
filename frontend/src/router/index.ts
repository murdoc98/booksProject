// Composables
import customAuth from '@/router/guards/auth.guard'
import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'Welcome',
        component: Welcome,
      },
    ],
  },
  {
    path: '/protected',
    component: () => import('@/layouts/Main.vue'),
    beforeEnter: [customAuth],
    children: [
      {
        path: '',
        name: 'Profile',
        component: Profile,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
