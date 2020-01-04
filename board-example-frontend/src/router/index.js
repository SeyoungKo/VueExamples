import Vue from 'vue'
import Router from 'vue-router'
// 페이지별 컴포넌트 등록
import PostListPage from '../pages/PostListPage'
import PostViewPage from '../pages/PostViewPage'

Vue.use(Router)

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
  ]
})
