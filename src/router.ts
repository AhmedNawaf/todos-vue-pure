import IndexPage from '@/pages/IndexPage.vue'
import AboutPage from './pages/AboutPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './pages/LoginPage.vue'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/about', component: AboutPage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
