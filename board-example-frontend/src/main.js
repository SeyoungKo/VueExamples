// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Cookies from 'js-cookie' // js-cookie 라이브러리를 불러온다.

Vue.config.productionTip = false

function init(){
  // 쿠키에 저장된 토큰을 사용해 인증
  const savedToken = Cookies.get('accessToken')
  // 쿠키에 저장된 토큰이 있으면 signByToken 액션을 반환한다.
  if(savedToken){
    return store.dispatch('signinByToken', savedToken)
  }else{
    return Promise.resolve()  // 토큰이 없으면 바로 Promise를 성공시킨다.
  }
}
init().then(res=>{
  // init함수의 then 체이닝 메소드 내부는 init함수가 종료되었음을 보장받는다.
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})