<template>
    <div class = "memo-app">
      <!-- 하위 컴포넌트에서 데이터를 받는 함수 이벤트를 연결한다. -->
    <memo-form v-on:addMemo="addMemo"/>
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
  methods:{
    addMemo(payload){
      // 하위 컴포넌트에서 받은 데이터를 먼저 내부 데이터에 추가한다.
      this.memos.push(payload);
      this.storeMemo();
    },
    // 배열에 추가된 하위 컴포넌트 데이터를 문자열로 바꾼다.
    storeMemo(){
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memosToString); // .setItem(key, value)

    }
  },
  created(){
  this.memos = localStoreage.memos ? JSON.parse(localStorage.memos) : []
  },
}
</script>

<style scoped>

</style>