// 헤더 컴포넌트

<template>
    <div class="app-header">
        <h1>Community</h1>
        <!-- isAuthorized getter 함수에서 true가 반환되면 -->
        <div v-if="isAuthorized">
          <strong>
              <button @click="toggle">{{me.name}}님 환영합니다.
              <!-- isActive 값에 따라 변경되는 화살표 아이콘을 추가한다. -->
              <i v-if="!isActive" class="fas fa-sort-down"></i>
              <i v-else class="fas fa-sort-up"></i>
              </button>
          </strong>
          <!-- isActive가 true일 때만 보이는 박스 UI -->
          <ul v-if="isActive">
              <li><button @click="onClickSignOut">로그아웃</button></li>
          </ul>
        </div>
        <!-- isAuthorized getter 함수에서 false가 반환되면  -->
        <div v-else>
            <router-link :to="{name:'Signin'}">로그인</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name : 'AppHeader',
    data(){
        // 박스의 토글 상태
        return{
            isActive:false
        }
    },
    computed:{
        ...mapState(['me']), // 사용자 정보 상태를 불러온다.
        ...mapGetters(['isAuthorized']) // 사용자 인증 상태를 확인하는 게터를 불러온다.
    },
    methods:{
        toggle(){
            //toggle 메소드가 호출되면 isActive값이 반전된다.
            this.isActive = !this.isActive
        },
        onClickSignOut(){
            this.signout()  // sitnout() 액션을 실행한다.
            this.isActive= false
            alert('로그아웃 되었습니다.')
            // signout()액션으로 스토어에 저장된 토큰, 사용자 정보를 제거하고나서 router를 발생시킨다.
            this.$router.push({name:'PostListPage'})  // 클릭 이벤트 발생시 페이지를 이동시킨다.
        },
        ...mapActions(['signout']) // signout()액션 헬퍼
    },

}
</script>