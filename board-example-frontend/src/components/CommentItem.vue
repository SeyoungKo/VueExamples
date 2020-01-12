// 작성된 댓글 내용 컴포넌트
<template>
    <div class="comment-item">
        <!-- CommentList에 있던 속성들을 가져온다. -->
         <strong>{{comment.user.name}}</strong><span>{{comment.createdAt}}</span>
         <!-- 수정버튼을 클릭했을 때 댓글을 수정할 수 있는 textArea와 수정완료 버튼을 보여준다. -->
         <div v-if ="isEditing">
             <textarea v-model="editMessage" rows="3"></textarea>
           <!-- 수정완료시 onEdit 메소드를 호출한다. -->
             <button @click="onEdit">수정완료</button>
         </div>
        <!-- 댓글 내용만 보여주는 form은 isEditing이 false일 때만 보여지도록 한다. -->
        <p v-else>{{ comment.contents }}</p>
        <!-- 수정버튼 클릭 이벤트 리스너로 toggleEditMode 메소드를 연결한다. -->
        <ul v-if="isMyComment">
           <li><button type="button" @click="toggleEditMode">{{ editButtonText }}</button>
           <button type="button" >삭제</button></li>
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
    data(){
      return{
          // 현재 컴포넌트가 수정모드인지 읽기 모드인지 구분할 수 있도록 isEditing 변수를 추가한다.
          isEditing : false,
          // 댓글 수정 form과 연결될 반응형 문자열 변수를 선언한다.
          editMessage:''
      }
    },
    computed:{
         // 현재 로그인한 id (me.id)와 게시물 댓글 작성자 (comment.user.id)가 일치하면 댓글 수정, 삭제 버튼이 보여지게 한다.
        isMyComment(){
            return this.isAuthorized && this.comment.user.id === this.me.id
        },
        // isEditing 값이 참일 경우 '수정 취소'를 , 거짓일 경우 '수정'을 반환하도록 작성한다.
        editButtonText(){
            return this.isEditing ? '수정 취소' : '수정'
        },
        isValidComment(){
            // 수정된 댓글이 1자 ~ 255자 사이이면 true, 아니면 false 반환
            return this.editMessage.length > 0 && this.editMessage.length < 256
        },
        // 현재 로그인한 사용자 정보를 스토어에서 참조해 가져온다.
        ...mapState(['me']),
        // 현재 로그인 여부를 아는 게터를 가져온다.
        ...mapGetters(['isAuthorized']),

    },
    methods:{
        // toggleEditMode()가 호출될 때마다 isEditing 값이 반전된다.
        toggleEditMode(){
            this.isEditing = !this.isEditing

            if(this.isEditing){
                // 사용자가 수정모드에 진입했을 때 현재 댓글과 동일한 내용을 보여주기 위해서
                this.editMessage = this.comment.contents   // 수정모드로 바뀔때마다 현재 댓글 내용을 수정할 메세지에 바인딩해준다.
            }
        },
        onEdit(){
            // 댓글이 유효성 검사를 통과한 상태라면 edit 이벤트를 실행하고 아니라면 경고창을 띄운다.
            if(this.isValidComment){
                this.isEditing = false
                const {id} = this.comment
                this.$emit('edit', {id, comment: this.editMessage})
            }else{
                alert('댓글은 1자 이상 255자 이하여야 합니다.')
            }
        }
    }
}
</script>