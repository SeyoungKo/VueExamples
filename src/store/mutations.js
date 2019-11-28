import {SET_MESSAGE} from './mutation-types'

// state 상태 변경하는 곳

export default{
    [SET_MESSAGE] (state, message){
        state.messages.push(message)
    }
}
