<template>
    <div class = "memo-app">
    <memo-form/>
    <memo/>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MemoForm from './MemoForm'
// eslint-disable-next-line no-unused-vars
import Memo from './Memo'
export default {

  name:'MemoApp',
  components:{
    MemoForm,
    Memo
  },
  data(){
    return {
      memos:[],
    }
  },
  created(){
  //  this.memos = localStoreage.memos ? JSON.parse(localStorage.memos) : []
  }
}
</script>

<style scoped>

</style>