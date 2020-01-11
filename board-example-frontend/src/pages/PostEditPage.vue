// 게시물 수정 페이지
<template>
    <div class="post-edit-page">
        <h3>게시물 수정</h3>
        <!-- 게시물 데이터가 있는 경우에만 PostEditForm을 렌더한다. -->
        <post-edit-form v-if="post"
                    :post="post"
                    @submit="onSubmit" />
        <!-- 게시물 데이터가 없는 경우 로딩 문구를 렌더한다. -->
        <p v-else>게시물 불러오는 중...</p>
    </div>
</template>

<script>
import {mapState} from 'vuex' // index.js 라우트 beforeEnter훅에서 postId에 대한 게시물을 스토어에 담은 상태
import PostEditForm from '../components/PostEditForm'
import api from '@/api'

export default {
    name: 'PostEditPage',

    components:{
        PostEditForm
    },
    props:{
        // 라우터의 파라미터 (:postId)를 받아오기 위한 props를 선언
     postId:{
         type:String,
         required:true
        }
    },
    computed:{ // 라우트의 beforeEnter 훅에서 가져온 스토어에 담긴 postId에 대한 게시물을 가져온다.
        ...mapState(['post'])
    },
    methods:{
        onSubmit(payload){
            // PostEditForm의 submit 이벤트 헨들러인 onSubmit()
            console.log(payload)
        }
    }
}
</script>