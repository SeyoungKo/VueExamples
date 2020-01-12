<template>
   <div class="post-view-page">

        <!-- 컴포넌트에 라우터를 연결한다. path에 동적인 변수(postId)가 포함된다 -->
        <post-view v-if="post" :post="post"/>
         <p v-else>게시글 불러오는 중...</p>
           <router-link :to="{name: 'PostEditPage', params:{postId}}">수정</router-link>
           <button @click="onDelete">삭제</button>
        <router-link :to="{name: 'PostListPage'}">목록</router-link>
        <!-- commentList 컴포넌트에 comments데이터를 props로 전달한다. -->
        <comment-list v-if="post" :comments="post.comments"/>
        <!-- comment-form에서 보낸 submit의 이벤트 리스너 추가 -->
        <comment-form @submit="onCommentSubmit"/>
     </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import {mapActions} from 'vuex' // mapActions 헬퍼 함수 (actions)
import PostView from '../components/PostView'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import api from '@/api'

export default {
    name: 'PostViewPage',
    props:{
        // 컴포넌트 외부에서 게시물 정보를 직접 주입받는다.
        postId:{
            type:String,
            required:true // props를 통해 라우트의 파라미터값(:postId)에 접근한다.
        }
    },
    methods:{
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
        },
        onCommentSubmit(comment){
            // CommentForm에서 this.$emit('submit',comment)로 전달한 인자를 받았다.
            if(!this.isAuthorized){
                alert('로그인이 필요합니다.')
                this.$router.push({name: 'Signin'})
            }else {
                // 인증된 사용자인 경우 createComment 액션을 통해 API 서버를 호출한다.
                this.createComment(comment).then(()=>{
                    alert('댓글이 성공적으로 작성되었습니다.')
                }).catch(err=>{
                    alert(err.response.data.msg) // 서버 에러메세지
                })
            }
        },
        ...mapActions([
            'fetchPost',
            'createComment'
        ])
    },
     computed:{
        ...mapGetters([ // 인증 여부를 확인하기 위해 게터 함수를 컴포넌트에 매핑한다.
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
        PostView,
        CommentList,
        CommentForm
    }
}
</script>
