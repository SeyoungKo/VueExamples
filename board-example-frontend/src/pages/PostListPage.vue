// 커뮤니티 리스트 보여주는 화면

<template>
  <div class="post-list-page">
    <h2>포스트 게시글</h2>
    <!-- 하위 컴포넌트에 props 속성에 posts를 내려준다. -->
    <!-- post-list 컴포넌트 호출 -->
     <post-list :posts="posts"/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import api from '@/api'
import {mapActions} from 'vuex' // mapActions 헬퍼 함수 (actions)

export default{
    name : 'PostListPage',
    created(){
     // api 서버에서 데이터를 받는 actions를 호출한다.
       this.fetchPostList()
    },
    components: {
        PostList
    },
    data(){
        // 하위 컴포넌트의 데이터를 posts 배열으로 컴포넌트에 담는다.
        return{
            posts : []
        }
    },
    methods:{
        // mapActions 헬퍼 함수를 fetchPostList 함수에 매핑한다.
        ...mapActions(['fetchPostList'])
    }

}
</script>

<style scoped>

</style>