<template>
  <div id="app">
     <AppHeader/>
     <!-- name="header"인 헤더 (헤더 이름을 다르게 해 여러개 설정할 수 있다.) -->
    <router-view name="header"/>
    <router-view/>
  </div>
</template>

<script>
// AppHeader 컴포넌트를 App 컴포넌트에 삽입한다
import AppHeader from './components/AppHeader'

export default {
  name: 'App',
  components:{
    AppHeader
  }
}
</script>

<style>
  @import 'http://localhost:8000/assets/index.css';
</style>
