import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ComponentDetail from '../views/ComponentDetail.vue'
import PageView from '../views/PageView.vue'
import MigratePermissions from '../views/MigratePermissions.vue'
import PmsJuDrawer from '../views/PmsJuDrawer.vue'
import RoomPriceQuiz from '../views/RoomPriceQuiz.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/prototype/pms-ju-drawer',
    name: 'PmsJuDrawer',
    component: PmsJuDrawer
  },
  {
    path: '/room-price-quiz',
    name: 'RoomPriceQuiz',
    component: RoomPriceQuiz
  },
  {
    path: '/migrate-permissions',
    name: 'MigratePermissions',
    component: MigratePermissions
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

