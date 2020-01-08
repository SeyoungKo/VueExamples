// 회원가입
<template>
    <div class="sign-up-page">
        <h3>회원가입</h3>
        <!-- signupform 컴포넌트에서 submit 이벤트가 발생하면 "submit" 메소드가 호출된다. -->
        <SignupForm @submit="onSubmit"/>
        <p>이미 가입하셨나요?<router-link :to="{name:'Signin'}">로그인하러가기</router-link></p>
    </div>
</template>

<script>
import SignupForm from '../components/SignupForm'
import api from '@/api'

export default {
    name: 'Signup',
    components:{
        SignupForm
    },
    methods:{
        onSubmit(payload){
         const {email, password, name} = payload

         api.post('/auth/signup',{name, email, password}).then(res=>{
             // 회원가입에 성공하면 성공 메세지를 노출하고 메인화면으로 이동한다.
             alert('회원가입이 완료되었습니다.')
             // 메인화면으로 이동
             this.$router.push({name:'Signin'})
         }).catch(err=>{
             // 회원가입에 실패하면 서버에서 전송받은 에러 메세지를 보여준다.
             alert(err.response.data.msg)
         })
       }
    }
}
</script>

<style scoped>

</style>