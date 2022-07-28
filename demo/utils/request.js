const axios = require("./axios")
export function sendVerifyCode(data) {
  axios.post("/", data)
}
export function verifyCodeMatch(data) {
  axios.post("/", data)
}
export function likePost(data) {
  axios.post("/", data)
}
export function dislikePost(data) {
  axios.post("/", data)
}
export function followPost(data) {
  axios.post("/", data)
}
export function unfollowPost(data) {
  axios.post("/", data)
}