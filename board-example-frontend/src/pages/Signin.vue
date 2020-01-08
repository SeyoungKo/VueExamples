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
import { mapActions } from 'vuex'

export default {
    name: 'Signin',
    components:{
        SigninForm
    },
    methods:{

        onSubmit(payload){
            this.signin(payload).then(res=>{
                alert('로그인이 완료되었습니다.')
                this.$router.push({name: 'PostListPage'})
            }).catch(err=>{
                alert(err.response.data.msg)
            })
        }, ...mapActions(['signin'])
    }
}
</script>
