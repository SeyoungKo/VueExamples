// 게시물 조회 컴포넌트
<template>
  <div class="post-view">
    <div>
      <h1>{{ post.title }}</h1>
      <span>게시물 번호 {{ post.id }}</span>
      <strong>{{ post.user.name }} · {{ post.createdAt }}</strong>
    </div>
    <p>{{ post.contents }}</p>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  props: {
       // post에 대한 props를 가져올 때 타입 유효성검사를 꼭 한다.
    post: {
      type: Object,
      required: true,
      validator (post) {
        const isValidPostId = typeof post.id === 'number'
        const isValidTitle = !!post.title && post.title.length
        const isValidContents = post.contents && post.contents.length
        return isValidPostId && isValidTitle && isValidContents
      }
    }
  }
}
</script>