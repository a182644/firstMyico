import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// // import Home from '../components/Home.vue'
// // import Welcome from '../views/Welcome.vue'
// import User from '../views/user/User.vue'
// import Reports from '../views/report/Reports.vue'
// import Goods from '../views/good/Goods.vue'
// import Roles from '../views/role/Roles.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/login', component: () => import('../components/Login.vue') },
  {
    path: '/home', component: () => import('@/components/Home.vue'), children: [
      { path: '/home', redirect: '/welcome' },
      { path: '/welcome', component: () => import('@/views/Welcome.vue') },
      { path: '/users', component: () => import('@/views/user/User.vue') },
      { path: '/reports', component: () => import('@/views/report/Reports.vue') },
      { path: '/goods', component: () => import('@/views/good/Goods.vue') },
      { path: '/roles', component: () => import('@/views/role/Roles.vue') },
      { path: '/rights', component: () => import('@/views/right/Rights.vue') },
      { path: '/params', component: () => import('@/views/params/Params.vue') },
      { path: '/orders', component: () => import('@/views/order/Orders.vue') },
      { path: '/categories', component: () => import('@/views/categorie/Categories.vue') }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
