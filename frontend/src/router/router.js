import{createRouter, createWebHistory} from 'vue-router'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router