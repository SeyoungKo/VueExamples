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
import api from '@/api'

export default {
    name :'PostCreatePage',
    components:{
        PostCreateForm
    },
    methods:{
        // PostCreateForm에서 작성한 정보를 전달하는 onSubmit()
        onSubmit(payload){
            // console.log(payload)
            const {title, contents} = payload
            api.post('/posts',{title, contents}).then(res=>{
                alert('게시물 등록이 완료되었습니다.')
                // 게시물 작성이 성공하면 내가 작성한 게시물 페이지로 이동한다.
                this.$router.push({name : 'PostViewPage', params : {poastId : res.data.id.toString()}
                })
            }).catch(err=>{
                if(err.response.status ===401){
                    alert('로그인이 필요합니다.')
                    this.$router.push({name : 'Signin'})
                }else {
                    // 그외 에러
                    alert(err.response.data.msg)
                }
            })

        }
    }
}
</script>