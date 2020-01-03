// mutation-types 상수 이름을 불러와 스토어 값 변경

import {FETCH_POST_LIST} from './mutations-types'

export default{
    // FETCH_POST_LIST 변이 작성
    [FETCH_POST_LIST] (state,posts){
        state.posts = posts
    }
}