import Vue from 'vue'
import Router from 'vue-router'
// 페이지별 컴포넌트 등록
import PostListPage from '../pages/PostListPage'
import PostViewPage from '../pages/PostViewPage'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import PostCreatePage from '../pages/PostCreatePage'

// 스토어 모듈 추가
import store from '@/store'
// 헤더
import AppHeader from '../components/AppHeader'

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
      path:'/signup',
      name:'Signup',
      components:{
        header : AppHeader,
        default: Signup
      }
    },
    {
      path:'/signin',
      name:'Signin',
      component:
         Signin
      },
      {
        path:'/post/create',
        name: 'PostCreatePage',
        components:{
          header : AppHeader,
          default: PostCreatePage
        },
        // beforeEnter 가드 훅 추가
        beforeEnter(to, from, next){
          const {isAuthorized}= store.getters
          if(!isAuthorized){ // Authorized =false일때
            alert('로그인이 필요합니다.')
            // 로그인이 되어있지 않으면 Signin 페이지로 이동한다.
            next({name:'Signin'})
          }
          next()
        }
      },
      {
        path:'/post/:postId',
        name:'PostViewPage',
        components:{
          header : AppHeader, //헤더에 AppHeader 컴포넌트를 적용
          default :PostViewPage, // 바디에 PostViewPage 컴포넌트를 적용
        },
        props: {
          default:true
        }
      }
  ]
})
