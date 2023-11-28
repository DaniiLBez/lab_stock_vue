import { createRouter, createWebHistory } from 'vue-router'
import WelcomeComponent from "@/components/WelcomeComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeComponent
    },
    {
      path: '/stock',
      name: 'stocks',
      component: () => import('../views/StockView.vue')
    },
    {
      path: '/broker',
      name: 'brokers',
      component: () => import('../views/BrokerView.vue')
    }
  ]
})

export default router
