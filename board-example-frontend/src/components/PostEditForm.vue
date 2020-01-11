// 게시물 수정하기 컴포넌트

<template>
    <div class="post-edit-form">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <lahel>게시물 번호</lahel>
            <!-- 게시물 번호를 보여주는 비활성 입력창 -->
            <input type="text"
                   :value="post.id" disabled/>
            <label>게시물 생성일</label>
            <!-- 게시물 생성일을 보여주는 비활성 입력창 -->
            <input type="text"
                   :value="post.createdAt" disabled/>
            <label>제목</label>
            <input v-model="title" type="text" placeholder="게시물 제목을 입력하세요."/>
            <label>내용</label>
            <textarea v-model="contents" rows="5" placeholder="게시물 내용을 입력해주세요."/>
            <button type="submit">수정하기</button>
            <router-link :to="{name:'PostViewPage',params:{postId:post.id}}">취소</router-link>
          </fieldset>
        </form>
    </div>
</template>
<script>
export default {
    name: 'PostEditForm',
    data(){
        // 게시물 수정에 필요한 정보들
        return{
            title : '',
            contents:''
        }
    },
    props:{
        // 컴포넌트 외부에서 게시물 정보를 직접 주입받는다. (title, contents)
        post:{
            type:Object,
            required:true,
            validator (post) {
                const isValidPostId = typeof post.id === 'number'
                const isValidTitle = !!post.title && post.title.length
                const isValidContents = post.contents && post.contents.length
                return isValidPostId && isValidTitle && isValidContents
             }
        }
    },
    created(){
      // props로 주입받은 데이터를 바로 컴포넌트에서 사용하기 위해 data 속성에 넣어준다.
      this.title = this.post.title
      this.contents = this.post.contents
    },
    methods:{
        // 정보 수정 완료시 호출되는 onSubmit() 함수
        onSubmit(){
            const {title, contents} = this
            this.$emit('submit', {title, contents})
        }
    }
}
</script>