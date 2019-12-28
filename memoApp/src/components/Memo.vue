<template>
<!--MemoApp 컴포넌트의 ul 내부에 들어가는 props 데이터 -->
        <li class = "memo-item">
                <strong>{{memo.title}}</strong>

                <!--더블클릭시 수정할 수 있도록 이벤트 추가  -->
               <template>
                 <p @dblclick="handleDblclick">
                   <template v-if="!isEditing">{{memo.content}}</template>
                   <!-- 더블클릭했을 때만 수정할 수 있도록 Input 활성화 -->
                   <input v-else type="text" ref="content" :value="memo.content"/>
                 </p>
               </template>

                <button type="button" @click="deleteMemo">
                        <i class="fas fa-times"></i>
                </button>
        </li>
</template>

<script>
export default {
    name : 'Memo',
    data(){
     return{
      isEditing: false
     }
    },
    props:{
        memo:{
          type:Object
        }
    },
    methods:{
       deleteMemo(){
           // 부모 컴포넌트(MemoApp)로부터 받은 props 데이터 중 id를 deleteMemo() 함수의
           // 파라미터로 전달해준다.
        const id = this.memo.id;
        this.$emit('deleteMemo', id);
       },
       handleDblclick(){
        this.isEditing = true;
       },
    }
}
</script>

<style scoped>
 .memo-item{
    overflow:hidden;
    position: relative;
    margin-bottom: 20px;
    padding:24px;
    box-shadow: 0 4px 10px -4px rgba(0,0,0,0.2);
    background-color: #fff;
    list-style: none;
 }

 .memo-item button{
    background: none;
    position:absolute;
    right:20px;
    top:20px;
    font-size: 20px;
    color:#e5e5e5;
    border:0;
}
 .memo-item strong{
    display:block;
    margin-bottom: 12px;
    font-size:18px;
    font-weight: normal;
    word-break: break-all;
 }
 .memo-item p{
    margin:0;
    font-size: 14px;
    line-height: 22px;
    color: #666;
 }
.memo-item p input [type="text"]{
    box-sizing: border-box;
    width:100%;
    font-size: inherit;
    border : 1px solid #999;
}
</style>