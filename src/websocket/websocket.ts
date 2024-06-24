import { wsStore } from '@/store/wsStore'
import msgHandler from './msgHandler'

let WebsocketObj:any = null
//创建websocket
function createWebSocket(url:string) {
    // if (!url) {
    //     url = 'ws://'
    // }
    //判断WebsocketObj对象是否存在
    if (!WebsocketObj) {
        WebsocketObj = new WebSocket(url)
        console.log('创建成功=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    } else {
        //WebsocketObj已经存在
        console.log('WebsocketObj已经存在', WebsocketObj.readyState);
    }

    //断开连接成功的回调方法
    WebsocketObj.onclose = () => {
        console.log('websocket连接关闭');
        // store.commit('SET_WEB_SOCKET_STATE', 3)
        const store = wsStore()
        store.setWebsocketState(3)
    }

    //连接发生错误的回调方法
    WebsocketObj.onerror = (e:any) => {
        //websocket连接异常
        console.log('websocket连接异常', e)
    }

    //连接成功建立的回调方法
    WebsocketObj.onopen = () => {
        console.log('websocket连接成功')
        // store.commit('SET_WEB_SOCKET_STATE', 1)
        const store = wsStore()
        store.setWebsocketState(1)
    }

    //接收到的消息的回调方法
    WebsocketObj.onmessage = (e:any) => {
        try {
            //接收到的消息
            // const message = e.data
            // if (message) {
            //     console.log(message)
            // }
            console.log('接收到服务端的消息', e)
                //接收到的消息，分装接收消息存储到状态中
            msgHandler(e)
        } catch (error) {
            console.log(error)
        }
    }
}

//关闭websocket
function closeWebsocket() {
    WebsocketObj.close();
    WebsocketObj = null
}

//发送消息指令
function sendSock(agentData:any) {
    //ws若是开启状态，发送指令
    if (WebsocketObj && WebsocketObj.readyState === WebsocketObj.OPEN) {
        //发送指令
        console.log('我是发送的消息:', JSON.stringify(agentData))
        WebsocketObj.send(JSON.stringify(agentData))
    } else {
        console.log('websocket未创建！', WebsocketObj)
    }
}

export {
    createWebSocket,
    closeWebsocket,
    sendSock
}