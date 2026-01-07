import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ComponentDetail from '../views/ComponentDetail.vue'
import PageView from '../views/PageView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/components/:id',
    name: 'ComponentDetail',
    component: ComponentDetail,
    props: true
  },
  {
    path: '/pages/:id',
    name: 'PageView',
    component: PageView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

