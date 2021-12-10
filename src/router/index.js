import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Persona from '../views/Persona.vue'
import Habitacion from '../views/Habitacion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //{
    //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //},
  {
    path: '/persona',
    name: 'Persona',
    component: Persona
  },
  {
    path: '/habitacion',
    name: 'Habitacion',
    component: Habitacion
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
