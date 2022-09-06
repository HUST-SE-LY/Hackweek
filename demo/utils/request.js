// const axios = require('./axios')
import {
  showToast
} from "./wx-event"

function request(path, data, method, type,header) {
  return new Promise((resolve, reject) => {
    wx.cloud.callContainer({
      config: {
        env: 'prod-7gigvlg43eb566e9', // 微信云托管的环境ID
      },
      path, // 填入业务自定义路径和参数，根目录，就是 / 
      method: method || "get", // 按照自己的业务开发，选择对应的方法
      header: header || {
        'X-WX-SERVICE': 'demo1', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        // 用storage来存登录时后端给的token
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Bearer " + wx.getStorageSync('token'),
      },
      data: data
      // dataType:'text', // 默认不填是以 JSON 形式解析返回结果，若不想让 SDK 自己解析，可以填text
      // 其余参数同 wx.request
    }).then((res) => {
      console.log(res)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(res.data)
      } else {
        // 这个看后端有没有好好写errMsg，好好写的话可以统一拿errMsg做toast内容
        // showToast(res.errMsg);
        reject(res)
      }
    }).catch((err) => {
      showToast(err.errMsg);
      console.log(err)
      reject(err)
    });
  })
}
export function sendVerifyCode(data) {
  return request('/user/getcode', data, "post")
}
export function verifyCodeMatch(data) {
  return request('/user/login', data, "post")
}
export function releaseNewItem(data) {
  return request('/post/create', data, "post")
}
export function getPostsList(data) {
  console.log(data)
  return request("/post/getPostsList", data)
}
export function searchByTitle(data) {
  return request("/post/selectByTitle",data)
}
export function searchByTag(data) {
  return request("/post/selectByTag",data);
}
export function getUserDetail(data) {
  return request("/user/getUserDetail",data)
}
export function getUserComments(data) {
  return request("/comment/getCommentListByUser",data)
}
export function getPostComments(data) {
  return request("comment/getCommentListByPost",data)
}
export function releasePostComment(data) {
  return request("/comment/create",data,"post")
}
export function editUserName(data) {
  return request("/user/updateUserDetail",data,'put');
}
export function getPostById(data) {
  return request("/post/getPostByid",data);
}
export function deleteComment(data) {
  return request("/comment/delete",data,'delete');
}
export function getMyPost(data) {
  return request("/post/getPostListByUser",data);
}
export function editMyPost(data) {
  return request("/post/update",data,'put');
}
export function deleteMyPost(data) {
  return request("/post/delete",data,'delete')
}

// 点赞/取消点赞一体化
export function toggleLikePost(data) {
  return request('/post/thumb', data, "post")
}
export function toggleFollowPost(data) {
  return request('/post/follow', data, "post")
}