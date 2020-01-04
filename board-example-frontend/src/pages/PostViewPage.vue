<template>
   <div class="post-view-page">
   <div class="post-view">
     <div>
        <h1>게시글의 제목이 노출된다.</h1>
        <span>게시물 번호 1</span>
        <strong>홍길동 . 2019-01-01 09:00</strong>
     </div>
        <p>해당 영역에는 게시글의 콘텐츠 내용이 노출된다.</p>
     </div>
        <!-- 컴포넌트에 라우터를 연결한다. path에 동적인 변수(postId)가 포함된다 -->
        <router-link :to="{name: 'PostListPage'}">목록</router-link>
     </div>
</template>

<script>
import {mapActions} from 'vuex' // mapActions 헬퍼 함수 (actions)

export default {
    name : 'PageViewPage',
    methods:{
        ...mapActions(['fetchPost'])         // mapActions 헬퍼 함수를 fetchPost 함수에 매핑한다.
    },
    props:{
        postId:{
            type:String,
            required:true
        }
    },
    created(){
        // props 속성의 postId에 대한 게시물을 응답 받는다.
        this.fetchPost(`/${this.postId}`).catch(err=>{
            alert(err.response.data.msg)
            // 에러 발생시 이전 페이지로 보내준다.
            this.$router.back()
        })
    }
}
</script>

<style scoped>

</style>