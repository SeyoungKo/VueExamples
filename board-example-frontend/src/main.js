// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Cookies from 'js-cookie' // js-cookie 라이브러리를 불러온다.

Vue.config.productionTip = false

// 쿠키에 저장된 토큰을 사용해 인증
const savedToken = Cookies.get('accessToken')
// 쿠키에 저장된 토큰이 있으면 사용자의 정보를 받아온다.
  if(savedToken){
    store.dispatch('signinByToken',savedToken)
  }

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
