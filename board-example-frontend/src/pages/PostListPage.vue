// 데이터 리스트 보여주는 화면
<template>
  <div class="post-list-page">
    <h2>포스트 게시글</h2>
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
                <tr>
                    <td scope="col">1</td>
                    <td scope="col">게시글의 제목이 노출됩니다.</td>
                    <td scope="col">홍길동</td>
                    <td scope="col">2020-01-01 09:00</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
export default{
    name : 'PostListPage',
};
</script>

<style scoped>

</style>