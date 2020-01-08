// 게시물에 대한 상태 (키)를 추가한다.
export default{
    posts:[],
    post : null,  // 상세보기 페이지를 위한 게시물 상태 post
    accessToken:'', // 인증 상태 관리
    me : null       // 저장된 토큰 정보로 현재 로그인한 사용자를 알기 위한 상태
}