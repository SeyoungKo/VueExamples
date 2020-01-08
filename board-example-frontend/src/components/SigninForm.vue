// 로그인 페이지에서 이메일, 비밀번호 입력하는 컴포넌트
<template>
    <div class="sign-form">
     <form @submit.prevent="submit">
      <fieldset>
        <input type="text" v-model="email" placeholder="이메일을 입력해주세요."/>
        <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요."/>
        <button type="submit">로그인</button>
      </fieldset>
     </form>
    </div>
</template>

<script>
export default {
    name:'SignForm',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        submit(){
            const{email,password} = this;
            this.$emit('submit',{email, password})
        }
    }
}
</script>