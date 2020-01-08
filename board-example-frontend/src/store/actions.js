// 변이 실행과 함수 작성으로 응답되는 데이터를 인자로 넘겨준다.

// 변이 실행을 일으킬 액션 함수 정의하기
import api from '@/api'
import {FETCH_POST_LIST} from './mutations-types'
import {FETCH_POST} from './mutations-types'
import {SET_ACCESS_TOKEN} from './mutations-types'
import {SET_MY_INFO} from './mutations-types'
import {DESTROY_ACCESS_TOKEN} from './mutations-types'
import {DESTROY_MY_INFO} from './mutations-types'


// **비동기에 대한 처리를 정의한다.**
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
    },
    // 서버에 요청하고 응답으로 토큰을 받아 SET_ACCESS_TOKEN을 커밋
    signin({commit},payload){
        const {email,password} =payload
        return api.post('/auth/signin',{email,password}).then(res=>{
            const {accessToken} = res.data
            commit(SET_ACCESS_TOKEN, accessToken)

            // [SET_MY_INFO] 변이(accessToken에 해당하는 사용자 정보 가져오기)에 대한 작업
            return api.get('/users/me')
           }).then(res=>{
                // accessToken을 스토어에 저장하면 header에 토큰이 저장되므로 바로 사용자 정보를 불러올 수 있다.
                // SET_MY_INFO 변이에 사용자 정보를 저장한다.
                commit(SET_MY_INFO, res.data)
            })
    },
    // 이미 저장된 토큰 정보가 있을 때 자동으로 토큰을 이용해 로그인 처리(사용자 정보 가져오는)하는 함수
    signinByToken ({commit}, token){
        // 토큰을 스토어에 커밋한다.
        commit(SET_ACCESS_TOKEN,token)
        // 사용자의 정보를 받아오고 스토어에 커밋한다.
        return api.get('/users/me').then(res=>{
            //SET_MY_INFO 변이에 사용자 정보를 저장한다.
            commit(SET_MY_INFO,res.data)
        })
    },
    // 로그아웃을 하기 위해 스토어에 저장된 토큰, 사용자 정보 제거
    signout ({commit}){
        commit(DESTROY_MY_INFO)
        commit(DESTROY_ACCESS_TOKEN)
    }
}