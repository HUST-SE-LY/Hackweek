const axios = require("./axios")
export function sendVerifyCode(data) {
  axios.post("/",data)
}
export function verifyCodeMatch(data) {
  axios.post("/",data)
}
export function releaseNewItem(data) {
  axios.post("/",data)
}
