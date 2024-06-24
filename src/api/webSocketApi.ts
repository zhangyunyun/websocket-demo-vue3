/* 
   websocket发送消息接口函数
*/
import { sendSock } from '@/websocket/websocket'
import base64 from '@/hooks/base64'

/**
 * 备(手机客户端、客服客户端)获取通信token请求
 * 回调 DeviceAuthRsp
 * @param {String} userName 用户名
 * @param {String} password 密码
 */

export function DeviceAuthReq(loginName:string){
  const msg = {
    "Id": 1010,
    "MsgType": "DeviceAuthReq",
    "AccessToken": "",
    "Content": {
      "Credential": base64.encode(loginName),
      "AuthType": 2
    }
  }
  //发送信息
  sendSock(msg)
}

/* 
  向服务端发送心跳
  @param {String} token token
*/
export function HeartBeatReq(token:string){
  const msg = {
    "Id": 1001,
    "MsgType": "HeartBeatReq",
    "AccessToken": token,
    "Content": {
      "Token": token
    }
  }
  //发送信息
  sendSock(msg)
}