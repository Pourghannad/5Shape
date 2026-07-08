import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/PlayView.vue')
  },
  {
    path: '/level',
    name: 'level',
    component: () => import('../views/LevelView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
