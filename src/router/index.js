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
    component: () => import('../views/TablaCategoria.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/tablaarticulo',
    name: 'TablaArticulo',
    component: () => import('../views/TablaArticulo.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/tablausuario',
    name: 'TablaUsuario',
    component: () => import('../views/TablaUsuario.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    meta:{
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach( (to, from, next) => {
  if (to.matched.some (destinoRequiereAut => destinoRequiereAut.meta.requiresAuth) ){
    
    if (localStorage.getItem('token')) {
      next();
    }else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})

export default router
