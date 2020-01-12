// 게시글 댓글 리스트 노출
<template>
  <ul class="comment-list">
    <li v-for="comment in comments" :key="comment.id">
      <!-- CommentItem 컴포넌트의 onEdit 메소드를 등록한다. -->
      <comment-item :comment="comment" @delete="onDelete" @edit="onEdit"/>
    </li>
    <li v-if="comments.length <= 0">
      입력된 댓글이 없습니다.
    </li>
  </ul>
</template>
<script>
import CommentItem from '../components/CommentItem'
import {mapActions} from 'vuex'

export default {
    name:'CommentList',
    props:{
        // 상위 컴포넌트에서 comments 데이터를 props로 전달하였음
        comments:{
            type: Array,
            default(){
                return []
            }
        }
    },methods:{
      // CommentItem 컴포넌트에서 연결된 onEdit 메소드
      onEdit({id, comment}){
        // editComment 액션을 사용해 api 서버에 댓글 수정 요청을 보낸다.
        this.editComment({ commentId: id, comment }).then(res => {
          alert('댓글이 수정되었습니다.')
        })
        .catch(err => {
          if (err.response.status === 401) {
            alert('로그인이 필요합니다.')
            this.$router.push({ name: 'Signin' })
          } else {
            alert(err.response.data.msg)
          }
        })
    },
      onDelete(commentId){  // CommentItem 컴포넌트 onDelete('delete', id)로 보낸 인자값
        this.deleteComment(commentId).then(res => {
          //삭제 성공시 성공 메세지를 노출한다.
          alert('댓글이 삭제되었습니다.')
        }).catch(err => {
          //삭제 실패시 상황에 따라 처리한다.
          if(err.response.status === 401){
            alert('로그인이 필요합니다.')
            this.$router.push({name : 'Signin'})
          }else {
            alert(err.response.data.msg) // 서버 에러 메세지
          }
        })
      },
      // editComment 액션을 CommentList 컴포넌트에 등록한다.
      ...mapActions(['editComment', 'deleteComment'])
    },
    components:{
        CommentItem
    }
}

</script>