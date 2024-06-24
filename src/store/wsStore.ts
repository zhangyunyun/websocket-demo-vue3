/*
 * @Author: v3-vite-test 876023825@qq.com
 * @Date: 2023-07-27 17:01:19
 * @LastEditors: v3-vite-test 876023825@qq.com
 * @LastEditTime: 2023-09-07 10:54:58
 * @FilePath: \demo-vue3\src\store\wsStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia"

// interface WsState {
//     webSocketState:number,
//     webSocketToken:string
// }

export const wsStore = defineStore('wsState',{
    // 相当于data
//    state:() => {
//         return {
//             //所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
//             webSocketState:0, //websocket状态
//             webSocketToken:localStorage.getItem('WEBSOCKET_TOKEN'), //wensocket token登录后存储的token值
//         }
//     },
// 或者
    state:() => ({
        //所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
        webSocketState:0, //websocket状态
        webSocketToken:localStorage.getItem('WEBSOCKET_TOKEN'), //wensocket token登录后存储的token值
    }),

    getters:{
        
    },

    actions:{
        setWebsocketState(wsState:number){
            this.webSocketState = wsState
        },
        setWebsocketToken(wsToken:string){
            this.webSocketToken = wsToken
        }
    },

    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
})
