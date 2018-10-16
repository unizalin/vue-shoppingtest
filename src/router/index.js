import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'


Vue.use(Router)

export default new Router({
  routes: [
    {
      //防止用戶在網頁最後面輸入未知數字時，導入回登入頁
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      //路由訊息
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        }
      ]

    }
  ]
})
