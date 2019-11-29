// 상태 변경을 일으키는 이벤트 생성
// 실제 변경은 mutation에 커밋될 때 일어난다.
import {
    SET_MESSAGE,
    GET_CHANNELS
}from './mutation-types'

  
// 메세지 API 경로 제공
const get_message_path = cname => 'https://us-centrall-demoapp-1779c.cloudfunctions.net/v1/channels/'+ cname+'/messages'

// 메세지 API로 메세지를 받아오는 함수
async function fetch_get_messages (cname){
    // await로 async 실행을 잠시 중단하고 메세지 API 경로를 fetch
    const response = await fetch(get_message_path(cname))
    // fetch 결과를 response.json()으로 저장
    const json = await response.json()
    return json.messages
}

export default{
    // [SET_MESSAGE] ({commit}, message){
    //     commit(SET_MESSAGE, message)
    // },

    // // GET_CHANNELS 메서드 : Ajax로 데이터 받아오는 역할
    [GET_CHANNELS] ({commit}){
    //     fetch('https://us-centrall-demoapp-1779c.cloudfunctions.net/v1/channels')
    //         .then((json)=>{
    //             commit(GET_CHANNELS, json.channels)
    //         }) // json 변환한 데이터를 mutations에 커밋한다. ->업데이트 발생
    },

    // ** 메소드도 async 함수로 정의할 수 있다. **

    // 서버에서 메세지 받아오기
    async GET_MESSAGES({commit}, cname){
        // 서버에서 메세지를 GET 으로 받아옴
        const messages = await fetch_get_messages(cname)
        // 서버에서 받아온 메세지를 SET_MESSAGE에 저장
        commit(SET_MESSAGE, messages)
    },

    // 서버로 메세지 송신
    async POST_MESSAGES({commit}, {cname, message}){
        // 서버에 메세지를 POST로 송신함
        // fetch (연결 url, 송신 파라미터)
        const response = await fetch(get_message_path(cname),{
            method: 'POST',
            body : JSON.stringify({
                'body': message
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // POST 요청에 대한 응답을 받음
        const json = await response.json()
        // 응답이 OK면 메세지를 받아와 SET_MESSAGE에 커밋
        if(json.result ==='ok'){
            const message = await fetch_get_messages(cname)
            commit(SET_MESSAGES, messages)
        }
    }
}