<template>
  <div id="app">
   <app-header/>   <!-- 하위 vue 파일에서 생성한 div 엘리먼트 -->
   <memo-app/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MemoApp from './components/MemoApp';
export default {
  name: 'app',
  components: {
    AppHeader,
    MemoApp
  }
}
</script>

<style>
  @import "./styles/reset.css";

  #app{
    margin : 0 auto;
    width : 560px;
  }

</style>
