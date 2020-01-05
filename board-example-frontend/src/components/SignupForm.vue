// 회원가입 페이지에 삽입되는 정보 입력 컴포넌트
<template>
    <div class="signup-form">
        <!-- novalidate : HTML5에서 자체적인 유효성 검사를 하지 않도록 설정. 수동적으로 설정한다. -->
        <form @submit.prevent="submit" novalidate>
           <fieldset>
                <input type="text" v-model="name" placeholder="이름을 입력해주세요."/>
                <input type="text" v-model="email" placeholder="이메일을 입력해주세요."/>
                <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요."/>
                <input type="password" v-model="passwordConfirm" placeholder="비밀번호를 다시 한번 입력해주세요."/>

                <button type="submit">회원가입</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    name:'SignupForm',
    data(){
        return{
            name:'',
            email:'',
            password:'',
            passwordConfirm:''
        }
    },
    methods:{
        // 정보 입력 완료시 호출되는 함수
        submit(){
            const {name, email, password, passwordConfirm}= this
            if(!name || !email || !password || !passwordConfirm){
                alert('모든 항목을 입력해주세요.')
            }
            if(password !=passwordConfirm){
                alert('비밀번호가 일치하지 않습니다.')
                return
            }
            this.$emit('submit',{name, email, password})
        }
    }
}
</script>
