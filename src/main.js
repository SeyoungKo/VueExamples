
import Vue from 'vue' // vue 컴포넌트 import
import App from './App'  // 메인 컴포넌트 import

import router from './router' // 라우팅 설정
import store from './store' // 스토어 추가

Vue.config.productionTip = false

/* eslint-disable no-new */


/*
  el : '#애플리케이션이 렌더링 될 HTML요소(<div id="app"></div>)',
  router,
  components : {어떤 컴포넌트를 사용할지},
  template : '<애플리케이션을 렌더링할 템플릿/>'
  
*/ 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
