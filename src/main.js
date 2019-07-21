import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import router from '@/router'
Vue.config.productionTip = false
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('itcast_manage_tao') || to.path === '/login') {
    next()
  } else {
    next({ name: 'login' })
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
