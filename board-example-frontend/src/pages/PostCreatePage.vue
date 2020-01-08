// 게시물 생성 페이지
<template>
    <div class="post-create-page">
        <h3>게시물 작성하기</h3>
        <!-- PostCreateForm 하위 컴포넌트를 추가한다. -->
        <post-create-form @submit="onSubmit"/>
    </div>
</template>

<script>
import PostCreateForm from '../components/PostCreateForm'

export default {
    name :'PostCreatePage',
    components:{
        PostCreateForm
    },
    methods:{
        // PostCreateForm 컴포넌트 submit() 발생시 호출되는 onSubmit() 메소드
        onSubmit(payload){
            console.log(payload)
        }
    }
}
</script>