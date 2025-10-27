import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import DashboardPage from '../views/DashboardPage.vue'

const routes = [
  { path: '/', redirect: '/landing' },
  { path: '/landing', component: LandingPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { 
    path: '/dashboard', 
    component: DashboardPage,
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if (to.meta.requiresAuth && !user) next('/login')
  else next()
})

export default router
