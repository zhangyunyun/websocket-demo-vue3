<script setup lang="ts">
import { ref, refs, reactive } from 'vue'
import { onMounted, onUnmounted} from 'vue'
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { createWebSocket, closeWebsocket, sendSock } from '../websocket/websocket'
import { DeviceAuthReq, HeartBeatReq } from '@/api/webSocketApi'
import { wsStore } from '@/store/wsStore.ts'

const WebSocketUrl = ref('wss://gsydweixin.com/scrm-chat/websocket') //测试 线网websocket后台地址
// const WebSocketUrl = ref('ws://localhost:5000') //测试 本地websocket后台地址
//const WebSocketUrl = process.env.VUE_APP_WEBSOCKET_URL
const sendValue = ref('') //测试发送的信息(需要连接本地websocket后台服务)
const store = wsStore() //pinia
let { webSocketState,  webSocketToken } = storeToRefs(store)
const heartTimer = ref('') //心跳检测

onMounted(() => {
  //判断浏览器是否支持WebSocket
  if('WebSocket' in window && window.top === window){
    createWebSocket(WebSocketUrl.value)
  }else{
    //如果浏览器不支持WebSocket
    console.log('您的浏览器不支持WebSocket，请更换浏览器')
  }
})

onUnmounted(() => {
  // closeWebsocket()
  //离开页面摧毁定时器
  clearInterval(heartTimer.value)
  heartTimer.value = null
})

//监听websocket的状态
watch(webSocketState, (newStore) => {
  // console.log('监视webSocketState状态',newStore)
  switch(newStore){
    case 0:
      console.log('websocket正在建立连接,还未完成,初始默认值')
      break;
    case 1:
      console.log('websocket连接成功') 
      /* 
        向后端服务发送登录消息
        loginName是测试用户名，这里后台只接受电话号码
      */ 
      // if (window.top !== window) {
      //   const { name } = localStorage.getItem('LOGIN_INFO') ? JSON.parse(localStorage.getItem('LOGIN_INFO')) : {}
      //   console.log('----------向后端服务发送登录消息------------')
      //   DeviceAuthReq(name, 123456)
      // }
      const loginName = '13893212101'
      DeviceAuthReq(loginName)
      break;
    case 2:
      console.log('连接正在进行关闭握手，即将关闭')
      break  
    case 3:
      console.log('websocket连接已经关闭或者根本没有建立')
      break;  
    default:
      break;
  }
})

//监听websocketToken
watch(webSocketToken, (newToken) => {
  // console.log('监视websocketToken',newToken)
  if(newToken === ''){
    clearInterval(heartTimer.value)
    heartTimer.value = null
  }
  if(newToken){
    //发送心跳
    heartTimer.value = setInterval(() => {
      console.log('发送心跳')
      HeartBeatReq(newToken)
    },30000)
  }
})

//点击按钮连接
const linkWS = () => {
  createWebSocket(WebSocketUrl.value)
}

//点击按钮关闭连接
const closeWS = () => {
  closeWebsocket()
}

//发送测试消息
const sendTS = () => {
  //向后端服务器发送消息
  let msg = sendValue.value
  sendSock(msg)
}

//发送登录信息
const sendLG = () => {
  /*
    参数根据后台接收的定义，这里是测试参数
  */
  //const loginName = '13893212101'
  //DeviceAuthReq(loginName)
}

//发送心跳信息(一般在页面初始时(onMounted)中调用)
const sendHT = () => {
   
}
</script>

<template>
  <div class="home">
    <div class="sideBox">
        <button @click="linkWS()">建立websocket连接</button>
        <button @click="closeWS()">关闭websocket连接</button>
    </div>
    <h2>1.---------测试消息</h2>
    <div class="sideBox">
      <h3>显示服务端消息:</h3>
      <div class="msgServe">
        
      </div>
      <h3>客户端向服务端发消息:</h3>
      <div class="msgSend">
        <input type="text" name="" v-model="sendValue">
        <button type="" @click="sendTS()">测试消息</button>
      </div>
    </div>
    <h2>2.---------线网消息(SCRM)</h2>
    <div class="sideBox">
      <h3>显示服务端消息:</h3>
      <div class="msgServe">
        
      </div>
      <h3>客户端向服务端发消息:</h3>
      <div class="msgSend">
        <button @click="sendLG()">登录消息</button>
        <button @click="sendHT()">心跳信息</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home{
  h2{
    text-align:left;
    font-size:.65rem;
    font-weight:bold;
    color:#000;
  }
  h3{
    margin-top:10px;
    text-align:left;
    font-size:.3rem
  }
  .sideBox{
    margin-bottom:20px;
  }
}
</style>