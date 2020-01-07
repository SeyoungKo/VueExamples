// 헤더 컴포넌트

<template>
    <div class="app-header">
        <h1>Community</h1>
        <!-- isAuthorized getter 함수에서 true가 반환되면 -->
        <div v-if="isAuthorized">
          <strong>
              <button>{{me.name}}님 환영합니다.</button>
          </strong>
        </div>
        <!-- isAuthorized getter 함수에서 false가 반환되면  -->
        <div v-else>
            <router-link :to="{name:'Signin'}">로그인</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name : 'AppHeader',
    computed:{
        ...mapGetters(['isAuthorized']), // 사용자 인증 상태를 확인하는 게터를 불러온다.
        ...mapState(['me']) // 사용자 정보 상태를 불러온다.
    }
}
</script>