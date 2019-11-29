import {mapGetters, mapActions} from 'vuex' 
// 헬퍼함수 mapGetters, mapActions :
// getters, actions에 등록된 메서드를 매핑해준다.
import {SET_MESSAGE,
        GET_CHANNELS } from '../../store/mutation-types' //actions에서 정의한 상수 불러오기


export default{
    name : 'chat',

// mounted : 인스턴스 생성완료, 요소 마운트된 지점
   mounted(){
       this.GET_CHANNELS() // state.channels를 업데이트하는 지점
   },
// computed : 메서드 정의 (업데이트 된 값만 재계산된다.)
   computed: {
       ...mapGetters([
           'messages',
           'channels'
       ]),
   },
    methods : {    
        // actions에 등록된 메서드 매핑
        ...mapActions([
            SET_MESSAGE,
            GET_CHANNELS 
        ]),
        send_message(){
           this.SET_MESSAGE(this.message)
           this.message=" "
        }
    },
    data(){
        return{
            message: " "
        }
    }
}