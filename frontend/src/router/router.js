import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../services/authService'

import Home from '../views/Home.vue'
import UploadPanel from '../views/UploadPanel.vue'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  // {
  //   path: '/upload',
  //   name: 'UploadPanel',
  //   component: () => import('@/views/UploadPanel.vue')
  // },
    {
    path: '/upload',
    name: 'DocumentForm',
    component: () => import('@/components/DocumentForm.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { guest: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = isAuthenticated()
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  }
  else if (to.meta.guest && isLoggedIn) {
    next('/admin/dashboard')
  }
  else {
    next()
  }
})

export default router