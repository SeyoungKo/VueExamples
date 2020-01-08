import Vue from 'vue'
import Router from 'vue-router'
// 페이지별 컴포넌트 등록
import PostListPage from '../pages/PostListPage'
import PostViewPage from '../pages/PostViewPage'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import PostCreatePage from '../pages/PostCreatePage'
import PostEditPage from '../pages/PostEditPage'

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
      },
      {
        path :'/post/:postId/edit',
        name:'PostEditPage',
        components:{
          header : AppHeader,
          default:PostEditPage
        },
        props:{
          default:true
        },
        // 작성자만 수정할 수 있도록 heforeEnter 가드 훅 방어코드 작성
        beforeEnter(to, from ,next){
          // 비로그인 사용자는 접근 불가
          const {isAuthorized} = store.getters
          if(!isAuthorized){
            alert('로그인이 필요합니다.')
            next({name: 'Signin'})
            return false
          }
          // fetchPost 액션(postId에 대한 게시물 조회) 재사용하기
          store.dispatch('fetchPost', to.params.postId).then(res=>{
            const post = store.state.post
            const isAuthor = post.user.id === store.state.me.id // 게시물 작성자와 현재 로그인 사용자아이디가 일치하는지 확인
            if(isAuthor){
              // 일치하면 다음 라우트 진행
              next()  // 게시물 데이터 요청 성공시 postId에 대한 게시물을 받아 스토어에 저장할 것임.
            }else {
              alert('게시물 작성자만 게시물을 수정할 수 있습니다.')
              next(from) //이전 라우트로 이동
            }
          }).catch(err=>{
            // 게시물 데이터 요청에 실패하면 전 페이지로 돌아간다.
            alert(err.response.data.msg)  // ex ) /post/300 '포스트가 존재하지 않습니다.'
            next(from)
          })
        }
      }
  ]
})
