import { createRouter, createWebHistory } from 'vue-router'
import Recognizer from "@/components/recognizer/Recognizer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Recognizer
    }
  ]
})

export default router
