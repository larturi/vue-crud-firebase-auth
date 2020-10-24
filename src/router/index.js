import Vue from 'vue';
import VueRouter from 'vue-router';

import { auth } from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/Inicio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: () => import('../views/Agregar.vue'),
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const usuario = auth.currentUser;
    
    if (!usuario) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
