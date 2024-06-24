/* 
  登录成功 ok
  获取到用户信息，token信息，将信息存储到本地localStorage中
*/
import { wsStore } from '@/store/wsStore'

function deviceAuthRspHandle(message:any) {
    console.log(message)
    const wsToken = message.accessToken
    //store.commit('SET_WEBSOCKET_TOKEN', wsToken)
    const store = wsStore()
    store.setWebsocketToken(wsToken)
    localStorage.setItem('WEBSOCKET_TOKEN',wsToken)
}

export default {
    deviceAuthRspHandle
}