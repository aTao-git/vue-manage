import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import UserCtrl from '@/views/users/userCtrl.vue'
import Rightlist from '@/views/rights/rightlist.vue'
import Rightset from '@/views/rights/rightset.vue'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { name: 'welcome' },
      children: [{
        name: 'welcome',
        path: 'welcome',
        component: Welcome
      }, {
        name: 'userCtrl',
        path: 'users',
        component: UserCtrl
      }, {
        name: 'rightlist',
        path: 'rights',
        component: Rightlist
      }, {
        name: 'rightset',
        path: 'roles',
        component: Rightset
      }]
    }
  ]
})
