<template>
   <div class="post-view-page">

        <!-- 컴포넌트에 라우터를 연결한다. path에 동적인 변수(postId)가 포함된다 -->
        <post-view v-if="post" :post="post"/>
         <p v-else>게시글 불러오는 중...</p>
           <router-link :to="{name: 'PostEditPage', params:{postId}}">수정</router-link>
        <router-link :to="{name: 'PostListPage'}">목록</router-link>
     </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex' // mapActions 헬퍼 함수 (actions)
import PostView from '../components/PostView'

export default {
    name: 'PostViewPage',
    props:{
        // 컴포넌트 외부에서 게시물 정보를 직접 주입받는다.
        postId:{
            type:String,
            required:true
        }
    },
    methods:{
        ...mapActions(['fetchPost'])
    },
     computed:{
        ...mapGetters([
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
        PostView
    }
}
</script>
