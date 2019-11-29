import {SET_MESSAGE,
        GET_CHANNELS
    } from './mutation-types'

// state 상태 변경하는 곳

export default{
    [SET_MESSAGE] (state, message){
        state.messages.push(message)
    },
    [GET_CHANNELS] (state, channels){
        state.channels = channels // state에 channels 반영
    } 
}
