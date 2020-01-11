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
            const {title, contents} = payload
            //PUT 메소드를 사용해 서버로 게시물 데이터를 전송한다.
            api.put(`/posts/${this.postId}`,{title, contents}).then(res=>{
              // 게시물 수정이 완료되면 게시물 페이지로 이동시킨다.
               alert('게시물이 성공적으로 수정되었습니다.')
               this.$router.push({
                   name:'PostViewPage',
                   params: {PostId:res.data.id.toString()}
               })
            }).catch(err=>{
                if(err.response.status ===401){
                    // 비로그인 접근 방지
                alert('로그인이 필요합니다.')
                this.$router.push({
                    name:'Signin'
                 })
             }else if(err.response.status ===403){
                 // 사용자가 이 게시물에 대해 수정권한이 없다면 이전페이지로 이동시킨다.
                 alert(err.response.ddata.msg)
                 this.$router.back() // 이전 페이지
             }else{
                 // 그 외 경우 서버에서 보내준 에러 메세지를 노출시킨다.
                 alert(err.response.data.msg)
             }
          })
        }
    }
}
</script>