//** MemoForm과 Memo 컴포넌트 이벤트를 연결해주는 상위 컴포넌트

<template>
    <div class = "memo-app">
      <!-- 하위 컴포넌트에서 데이터를 받는 함수 이벤트를 연결한다. -->
       <!-- ul 태그 내부에 로컬스토리지에서 불러오는 데이터를 넣는다 -->
    <memo-form @addMemo="addMemo"/>
       <ul class="memo-list">
         <memo v-for="memo in memos"
            :key="memo.id"
            :memo="memo" @deleteMemo="deleteMemo"
                         @updateMemo="updateMemo"/>
       </ul>
    </div>
</template>

<script>

import axios from 'axios';

import MemoForm from './MemoForm';
import Memo from './Memo';

  // axios url 객체를 생성한다.
  const memoAPICore = axios.create({
      baseURL : 'http://localhost:8000/api/memos'
  });

export default {

  name:'MemoApp',
  created(){

    memoAPICore.get('/').then(res=>{
      this.memos = res.data;
    });
},
  data(){
    return{
        memos: []
    };
  },
  methods:{
    // 하위 컴포넌트에서 전달받은 title, content 데이터를 API 호출 서버에 전달한다.
    addMemo(payload){

      memoAPICore.post('/',payload).then(res=>{
        // 결과 데이터를 memos에 추가한다.
        this.memos.push(res.data);
      });
    },

    deleteMemo(id){
      // 파라미터 id에 해당하는 메모 데이터 인덱스 찾기
      const targetIndex = this.memos.findIndex(v=> v.id ===id);

      // id로 서버에 데이터 삭제를 요청한다.
       memoAPICore.delete(`/${id}`).then(()=>{
         // 요청 후 memoApp 컴포넌트 memos 데이터에서도 삭제한다.
        this.memos.splice(targetIndex,1); // targetIndex부터 하나의 데이터 삭제
      });
    },

    updateMemo(payload){
      // payload의 id에 해당하는 수정된 메모를 찾아 저장한다.
      const {id, content} = payload;
      const targetIndex = this.memos.findIndex(v=>v.id===id);
      const targetMemo = this.memos[targetIndex];

      // 수정대상 id와 일치하는 수정된 데이터를 요청한다.
      memoAPICore.put(`/${id}`,{content}).then(()=>{
      // 요청후 memos 데이터에 해당하는 데이터를 업데이트한다.
      this.memos.splice(targetIndex, 1, {...targetMemo, content});
      });
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