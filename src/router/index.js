import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/StorePlayList',
    name: 'StorePlayList',
    component: () => import('../views/StorePlayList.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
