//编码
function encode(str:any){
 return btoa(
   encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
     return String.fromCharCode(parseInt('0x' + p1, 16))
   })
 )
}
//解码
function decode(str:string) {
 return decodeURIComponent(
   atob(str)
     .split('')
     .map(function(c:string) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
     })
     .join('')
 )
}

export default {
 encode,
 decode
}