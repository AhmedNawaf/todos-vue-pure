import IndexPage from '@/pages/IndexPage.vue'
import AboutPage from './pages/AboutPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
