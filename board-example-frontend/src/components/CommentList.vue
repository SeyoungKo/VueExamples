// 게시글 댓글 리스트 노출
<template>
  <ul class="comment-list">
    <li v-for="comment in comments" :key="comment.id">
      <div class="comment-item" >
          <strong>{{comment.user.name}}</strong><span>{{comment.createdAt}}</span>
          <p>{{comment.contents}}</p>
      </div>
    </li>
    <li v-if="comments.length <= 0">
      입력된 댓글이 없습니다.
    </li>
  </ul>
</template>
<script>
import CommentItem from '../components/CommentItem'
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
    },
    components:{
        CommentItem
    }
}

</script>