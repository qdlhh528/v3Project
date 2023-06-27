import { createRouter, createWebHistory } from 'vue-router'
import basicRoutes from './router.config'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes: basicRoutes
})

export default router
