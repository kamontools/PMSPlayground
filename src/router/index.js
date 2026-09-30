import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ComponentDetail from '../views/ComponentDetail.vue'
import PageView from '../views/PageView.vue'
import MigratePermissions from '../views/MigratePermissions.vue'
import PmsJuDrawer from '../views/PmsJuDrawer.vue'
import RoomPriceQuiz from '../views/RoomPriceQuiz.vue'
import PmsCloneTool from '../views/PmsCloneTool.vue'
import PmsSidebarDemo from '../views/PmsSidebarDemo.vue'
import CheckTemplateSwitcher from '../views/CheckTemplateSwitcher.vue'
import AutoGlReceiptPosting from '../views/AutoGlReceiptPosting.vue'
import PmsSelfServiceOnboarding from '../views/PmsSelfServiceOnboarding.vue'
import AdvancePaymentDemo from '../views/AdvancePaymentDemo.vue'
import AdvancePaymentDemoV2 from '../views/AdvancePaymentDemoV2.vue'
import AdvancePaymentDemoV3 from '../views/AdvancePaymentDemoV3.vue'
import SelfOnboardWizard from '../views/SelfOnboardWizard.vue'
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
    path: '/prototype/check-template-switcher',
    name: 'CheckTemplateSwitcher',
    component: CheckTemplateSwitcher
  },
  {
    path: '/prototype/auto-gl-receipt-posting',
    name: 'AutoGlReceiptPosting',
    component: AutoGlReceiptPosting
  },
  {
    path: '/prototype/self-service-onboarding',
    name: 'PmsSelfServiceOnboarding',
    component: PmsSelfServiceOnboarding
  },
  {
    path: '/prototype/self-onboard-wizard',
    name: 'SelfOnboardWizard',
    component: SelfOnboardWizard
  },
  {
    path: '/room-price-quiz',
    name: 'RoomPriceQuiz',
    component: RoomPriceQuiz
  },
  {
    path: '/prototype/pms-clone-tool',
    name: 'PmsCloneTool',
    component: PmsCloneTool
  },
  {
    path: '/prototype/pms-sidebar-demo',
    name: 'PmsSidebarDemo',
    component: PmsSidebarDemo
  },
  {
    path: '/prototype/advance-payment',
    name: 'AdvancePaymentDemo',
    component: AdvancePaymentDemo
  },
  {
    path: '/prototype/advance-payment-v2',
    name: 'AdvancePaymentDemoV2',
    component: AdvancePaymentDemoV2
  },
  {
    path: '/prototype/advance-payment-v3',
    name: 'AdvancePaymentDemoV3',
    component: AdvancePaymentDemoV3
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

