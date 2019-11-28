
// 상태 변경을 일으키는 이벤트 생성
// 실제 변경은 mutation에 커밋될 때 일어난다.

import {
    SET_MESSAGE
}from './mutation-types'

export default{
    [SET_MESSAGE] ({commit}, message){
        commit(SET_MESSAGE, message)
    },
}