// 커뮤니티 리스트에 호출되는 데이터 부분

<template>
    <div class="post-list">
      <div>
        <table>
            <colgroup>
                <col style="width : 10%;"/>
                <col style="width : 60%;"/>
                <col style="width : 10%;"/>
                <col style="width : 20%;"/>
            </colgroup>
            <thead>
                <tr>
                    <th scope = "col">번호</th>
                    <th scope = "col">제목</th>
                    <th scope = "col">작성자</th>
                    <th scope = "col">작성일</th>
                </tr>
            </thead>
            <tbody>
                <!-- 부모 컴포넌트에서 받은 Props 값을 각각의 col에 적용한다.  -->
                <tr v-for="post in posts" :key="post.id">
                  <!-- v-for문을 순회하면서 post.id 고유값을 부여한다. -->
                  <td scope="col">{{post.id}}</td>

                  <td scope="col">
                      <!-- -----------임시----------- -->
                      <!-- PostListPage로 리다이렉트 -->
                      <router-link :to="{name:'PostListPage'}">{{post.title}}</router-link>
                       <!-- --------------------- -->
                      [{{post.comments.length}}]
                   </td>

                   <td scope="col">{{post.user.name}}</td>
                   <td scope="col">{{post.createdAt}}</td>
                </tr>

                <!-- v-for과 동일한 코드 -->
                    <!-- <td scope="col">1</td>
                    <td scope="col">게시글의 제목이 노출됩니다.</td>
                    <td scope="col">홍길동</td>
                    <td scope="col">2020-01-01 09:00</td> -->

            </tbody>
        </table>
      </div>
    </div>
</template>

<script>

export default {
    name : 'PostList',
    props:{
        // 상위 컴포넌트에서 <post-list :posts="posts"/>로 내려진 배열 값 저장
     posts:{
       type:Array
      }
    }
}
</script>

<style scoped>

</style>