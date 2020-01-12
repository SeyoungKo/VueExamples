// 작성된 댓글 내용 컴포넌트
<template>
    <div class="comment-item">
        <!-- CommentList에 있던 속성들을 가져온다. -->
         <strong>{{comment.user.name}}</strong><span>{{comment.createdAt}}</span>
         <p>{{comment.contents}}</p>
         <ul v-if="isMyComment">
            <li><button type="button">수정</button></li>
            <li><button type="button">삭제</button>></li>
         </ul>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name:'CommentItem',
    // 컴포넌트 외부에서 props 속성으로 댓글 데이터를 받는다.
    props:{
        comment:{
            type:Object,
            required:true,
            // 유효성 검사
            validator(comment){
                const isValidCommentId = typeof comment.id ==='number'
                const isValidContents= comment.contents && comment.contents.length
                const isValidUser = !!comment.user
                return isValidCommentId && isValidContents && isValidUser
            }
        }
    },
    computed:{
        // 현재 로그인한 사용자 정보를 스토어에서 참조해 가져온다.
        ...mapState(['me']),
        // 현재 로그인 여부를 아는 게터를 가져온다.
        ...mapGetters(['isAuthorized']),
        // 현재 로그인한 id (me.id)와 게시물 댓글 작성자 (comment.user.id)가 일치하면 댓글 수정, 삭제 버튼이 보여지게 한다.
        isMyComment(){
            return this.isAuthorized && this.comment.user.id === this.me.id
        }
    }
}
</script>