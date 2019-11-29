import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)  // vue 사용할 수 있게함

// 상태관리할 데이터
const state={
    message : [],
    channels: [] 
}

// 인스턴스 생성 
export default new Vuex.Store({
    state,
    mutations,
    getters,
    action
})
