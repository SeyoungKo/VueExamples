// 게시물 생성 입력 form
<template>
    <div class="post-create-form">
        <form @submit.prevent="onSubmit">
            <!-- fieldset : form 요소를 박스로 묶어준다. -->
            <fieldset>
                <label>제목</label>
                <input v-model="title" type="text" placeholder="게시물 제목을 입력해주세요."/>
                <label>내용</label>
                <!-- rows="" : 스크롤없이 한번에 볼 수 있는 최대 줄 수 -->
                <textarea v-model="contents"
                          rows="5" type="text" placeholder="게시물 내용을 입력해주세요."/>
                <button type="submit">등록하기</button>
                <router-link :to="{name: 'PostListPage'}">취소</router-link>
            </fieldset>
        </form>
    </div>
</template>
<script>
export default {
    name : 'PostCreateForm',
    data(){
        return{
            title :'',
            contents:''
        }
    },
    methods:{
        // 정보 입력 완료시 호출되는 onSubmit() 함수
        onSubmit(){
            const {title, contents} = this
            this.$emit('submit', {title, contents}) //상위 컴포넌트에서 @submit = "상위 컴포넌트 메소드명"으로 호출하도록 함
        }
    }
}
</script>