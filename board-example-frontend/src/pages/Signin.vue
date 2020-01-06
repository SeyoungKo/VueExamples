// 로그인 페이지
<template>
    <div class="sign-in-page">
        <h3>로그인</h3>
        <!-- signinform 컴포넌트에서 submit 이벤트가 발생하면 "onSubmit" 메소드가 호출된다. -->
        <SigninForm @submit="onSubmit"/>
        <p>회원이 아니신가요?<router-link :to="{name:'Signup'}"> 회원가입하러 가기</router-link></p>
    </div>
</template>

<script>
import SigninForm from '../components/SigninForm'
import api from '@/api'

export default {
    name: 'Signin',
    components:{
        SigninForm
    },
    methods:{
        onSubmit(payload){
            const {email,password} = payload
            // /auth/signin 엔드포인트로 사용자가 입력한 email, password를 전송한다.
            api.post('/auth/signin',{email,password}).then(res=>{
                // console.log(res.data.accessToken)   // res.data.accessToken으로 토큰 확인 ㅇ

                // 로그인에 성공하면 api 모듈의 헤더에 토큰을 담는다.
                const {accessToken} = res.data
                api.defaults.headers.common.Authorization = `Bearer${accessToken}`

                alert('로그인이 완료되었습니다.')
                this.$router.push({name:'PostListPage'})
            }).catch(err=>{
                alert(err.response.data.msg)
            })
        }
    }
}
</script>
