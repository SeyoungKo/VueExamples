// 변이 실행과 함수 작성으로 응답되는 데이터를 인자로 넘겨준다.

// 변이 실행을 일으킬 액션 함수 정의하기
import api from '@/api'
import {FETCH_POST_LIST} from './mutations-types'
import {FETCH_POST} from './mutations-types'

export default{
    // 서버로부터 게시물 목록 데이터를 받아오는 함수
    fetchPostList({commit}){
        return api.get('/posts').then(res=>{
            // 변이 실행과 응답 데이터를 넘겨준다.
            commit(FETCH_POST_LIST,res.data)
        })
    },
    // 해당 고유 id (postId)에 대한 게시물 조회하는 함수
    fetchPost({commit}, postId){
        return api.get(`/posts/${postId}`).then(res=>{
            commit(FETCH_POST,res.data)
        })
    }
}