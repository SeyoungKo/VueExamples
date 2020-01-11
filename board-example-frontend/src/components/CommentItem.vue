// 댓글 내용 컴포넌트
<template>
    <div class="comment-item">
        <!-- CommentList에 있던 속성들을 가져온다. -->
         <strong>{{comment.user.name}}</strong><span>{{comment.createdAt}}</span>
         <p>{{comment.contents}}</p>
         <ul>
            <li><button type="button">수정</button></li>
            <li><button type="button">삭제</button>></li>
         </ul>
    </div>
</template>
<script>
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
    }
}
</script>