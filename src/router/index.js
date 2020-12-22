import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tablacategoria',
    name: 'TablaCategoria',
    component: () => import('../views/TablaCategoria.vue')
  },
  {
    path: '/tablaarticulo',
    name: 'TablaArticulo',
    component: () => import('../views/TablaArticulo.vue')
  },
  {
    path: '/tablausuario',
    name: 'TablaUsuario',
    component: () => import('../views/TablaUsuario.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
