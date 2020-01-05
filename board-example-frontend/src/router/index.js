import Vue from 'vue'
import Router from 'vue-router'
// 페이지별 컴포넌트 등록
import PostListPage from '../pages/PostListPage'
import PostViewPage from '../pages/PostViewPage'
import Signup from '../pages/Signup'

Vue.use(Router)
// 페이지를 이동할 때마다 routes에 컴포넌트를 등록해 준다.

export default new Router({
  mode : 'history',
  routes: [
   {
      path:'/',
      name:'PostListPage',
      component: PostListPage
    },
    {
      path:'/post/:postId',
      name:'PostViewPage',
      component:PostViewPage,
      props: true
    },
    {
      path:'/signup',
      name:'Signup',
      component:Signup
    }
  ]
})
