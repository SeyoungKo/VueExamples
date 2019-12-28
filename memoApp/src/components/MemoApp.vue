<template>
    <div class = "memo-app">
      <!-- 하위 컴포넌트에서 데이터를 받는 함수 이벤트를 연결한다. -->
       <!-- ul 태그 내부에 로컬스토리지에서 불러오는 데이터를 넣는다 -->
    <memo-form @addMemo="addMemo"/>
       <ul class="memo-list">
         <memo v-for="memo in memos"
            :key="memo.id"
            :memo="memo" @deleteMemo="deleteMemo"/>
       </ul>
    </div>
</template>

<script>

import MemoForm from './MemoForm';
import Memo from './Memo';
export default {

  name:'MemoApp',
  created(){
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
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

      // localStorage에 저장
      localStorage.setItem('memos', memosToString); // .setItem(key, value)

    },
    deleteMemo(id){
      // 파라미터 id에 해당하는 localStorage 메모 데이터 인덱스 찾기
      const targetIndex = this.memos.findIndex(v=> v.id ===id);
      // 데이터 삭제
      this.memos.splice(targetIndex,1);
      // 다시 localStorage에 저장
      this.storeMemo();
    }
  },
  components:{
    MemoForm,
    Memo
  }
};
</script>

<style scoped>
  .memo-list{
    padding: 20px 0;
    margin : 0;
  }
</style>