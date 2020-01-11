<template>
   <div class="post-view-page">

        <!-- 컴포넌트에 라우터를 연결한다. path에 동적인 변수(postId)가 포함된다 -->
        <post-view v-if="post" :post="post"/>
         <p v-else>게시글 불러오는 중...</p>
           <router-link :to="{name: 'PostEditPage', params:{postId}}">수정</router-link>
           <button @click="onDelete">삭제</button>
        <router-link :to="{name: 'PostListPage'}">목록</router-link>
     </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex' // mapActions 헬퍼 함수 (actions)
import PostView from '../components/PostView'
import api from '@/api'

export default {
    name: 'PostViewPage',
    props:{
        // 컴포넌트 외부에서 게시물 정보를 직접 주입받는다.
        postId:{
            type:String,
            required:true
        }
    },
    methods:{
        ...mapActions(['fetchPost']),

         // 삭제기능을 담당하는 onDelete()를 선언한다.
        onDelete(){
          // mapState에서 가져온 post의 id값을 변수에 할당한다.
          const {id} = this.post
          // 게시글 ID와 함께 HTTP DELETE 메소드를 실행한다.
          api.delete(`/posts/${id}`).then(res=>{
              // 게시글 삭제 성공시 성공에 대한 메세지를 노출한다.
              alert('게시물이 성공적으로 삭제되었습니다.')
              // PostListPage 페이지로 이동시킨다.
              this.$router.push({name:'PageListPage'})
          }).catch(err=>{
              if(err.response.status ===401){
                  // HTTP 상태가 401이면 경고 메세지를 띄운다.
                  alert('로그인이 필요합니다.')
                  this.$router.push({name: 'Signin'})
              }else{
                  // 403에러(권한이 없는 게시물을 삭제)하거나 서버 오류가 발생한 경우 서버에서 메세지를 내려준다.
                  alert(err.response.data.msg)
              }
          })
        }
    },
     computed:{
        ...mapGetters([
            'isAuthorized'
        ]),
        ...mapState([
            'post'
        ])
    },
    created(){
        // props 속성의 postId에 대한 게시물을 응답 받는다.
        this.fetchPost(`/${this.postId}`).catch(err=>{
            alert(err.response.data.msg)
            // 에러 발생시 이전 페이지로 보내준다.
            this.$router.back()
        })
    },
    components:{
        PostView
    }
}
</script>
