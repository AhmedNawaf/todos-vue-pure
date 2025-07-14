import IndexPage from '@/pages/IndexPage.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [{ path: '/', component: IndexPage }]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
