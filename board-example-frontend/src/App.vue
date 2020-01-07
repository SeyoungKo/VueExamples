<template>
  <div id="app">
     <AppHeader/>
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
