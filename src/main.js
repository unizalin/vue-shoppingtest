// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'


import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

//vue loading 效果
Vue.component('Loading', Loading)
//前端 axios 請求附帶 Cookies 設定
//跨域登入驗證
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*
導航守衛
當頁面有需要做驗證時候，需經過驗證才決定放行與否
*/
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`;
    //因為不在router 裡面 所以改成用 axios
    axios.post(api).then(response => {
      console.log(response.data);
      //登入成功會跳回首頁
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login'
        })
      }
    });
  } else {
    next();
  }

})
