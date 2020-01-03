// 변이 실행과 함수 작성으로 응답되는 데이터를 인자로 넘겨준다.

import api from '@/api'
import {FETCH_POST_LIST} from './mutations-types'

export default{
    // 서버로부터 게시물 데이터를 받아오는 함수 작성
    fetchPostList({commit}){
        return api.get('/posts').then(res=>{
            // 변이 실행과 응답 데이터를 넘겨준다.
            commit(FETCH_POST_LIST,res.data)
        })
    }
}