// 댓글 입력 form 컴포넌트
<template>
    <div class="comment-form">
        <textarea v-model="comment" rows="5" placeholder="댓글을 입력해주세요."/>
        <button type="button" @click="onSubmit">등록</button>
    </div>
</template>
<script>
export default {
    name: 'CommentForm',
    data(){
        return {
            comment:''
        }
    },
    methods:{
        // 버튼 클릭시 실행될 함수
        onSubmit(){
            //입력된 데이터를 submit 함수를 호출해 인자로 함께 전달한다.
            const {comment} = this
            this.$emit('submit',comment)
            // 작성이 완료된 후 입력된 데이터를 초기화한다.
            this.comment= ''
        }
    }
}
</script>