// 스토어 내에서 computed(변경, 갱신)과 같은 역할

export default {
    // 현재 로그인된 상태 (= 토큰, 사용자 정보 여부)를 아는 게터
    isAuthorized (state) {
         //스토어에 accessToken이 존재하고 me에 데이터가 있으면 true 반환, 아니면 false 반환
      return state.accessToken.length > 0 && !!state.me// !!state.me : 빈 문자열 검사
    }
  }