// const axios = require('./axios')
import {
  showToast
} from "./wx-event"
//使用Promise封装的意义在于：wx提供的原生接口是通过给success和false属性值来实现回调，如果想要做一些异步操作的话只能把异步操作的一大串代码当成参数传到函数里，然后函数再把这些参数作为success的属性值，不是很美观）而用Promise封装一下就可以使用传统的then或者async await来处理异步操作。同时统一封装也可以统一掉envId、Content-Type这种共用的参数
function request(path, data, method, contentType, header) {
  return new Promise((resolve, reject) => {
    wx.cloud.callContainer({
      config: {
        env: 'prod-8gfid1gkc77d5f7d', // 微信云托管的环境ID
      },
      path, // 填入业务自定义路径和参数，根目录，就是 / 
      method: method || "get", // 按照自己的业务开发，选择对应的方法
      header: header || {
        'X-WX-SERVICE': 'buqieryu', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        // 用storage来存登录时后端给的token
        'Content-Type': contentType || 'application/json; charset=UTF-8',
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

function cloudUploadFile(cloudPath, filePath) {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath, // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
      filePath, // 微信本地文件，通过选择图片，聊天文件等接口获取
      config: {
        env: 'prod-8gfid1gkc77d5f7d' // 微信云托管环境ID
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}



//发送验证码
export function sendVerifyCode(data) {
  return request('/user/getcode', data, "post")
}
//验证验证码
export function verifyCodeMatch(data) {
  return request('/user/login', data, "post")
}
//获取用户信息
export function getUserDetail(data) {
  return request("/user/getUserDetail", data)
}
//获取我的评论列表
export function getUserComments(data) {
  return request("/comment/getCommentListByUser", data)
}
//编辑用户信息，三个参数都是可选的
export function editUserInfo(data) {
  return request("/user/updateUserDetail", data, 'put');
}
//上传头像
export function uploadAvatar(data) {
  return cloudUploadFile(`avatar/avatar-${data.userid}`, data.filePath)
}


//发帖子
export function releaseNewItem(data) {
  return request('/post/create', data, "post")
}
//发帖子时传图片
export function updateImg(data) {
  return cloudUploadFile(`postImg/${data.fileName}`, data.filePath)
}
//获取帖子列表
export function getPostsList(data) {
  return request("/post/getPostsList", data)
}
//搜索
export function searchByTitle(data) {
  return request("/post/selectByTitle", data)
}
//标签分类
export function searchByTag(data) {
  return request("/post/selectByTag", data);
}
//获取帖子的评论列表
export function getPostComments(data) {
  return request("comment/getCommentListByPost", data)
}
//在帖子里发表评论
export function releasePostComment(data) {
  return request("/comment/create", data, "post")
}
//获取单个列表
export function getPostById(data) {
  return request("/post/getPostByid", data);
}
//删除评论
export function deleteComment(data) {
  return request("/comment/delete", data, 'delete');
}
//获取我的帖子
export function getMyPost(data) {
  return request("/post/getPostListByUser", data);
}
//编辑我的帖子
export function editMyPost(data) {
  return request("/post/update", data, 'put');
}
//删除我的帖子
export function deleteMyPost(data) {
  return request("/post/delete", data, 'delete')
}
//获取用户发布的帖子总数
export function getUserPostNum(data) {
  return request("/user/GetUserPostsSum", data);
}
//获取用户发布的评论总数
export function getUserReplyNum(data) {
  return request("/user/GetUserCommentsSum", data);
}
//获取用户发布的收藏总数
export function getUserFollowNum(data) {
  return request("/user/GetUserFollowsSum", data);
}

//获取用户评论列表
export function getUserFollow(data) {
  return request("/follow/getFollowList", data);
}
//获取用户收到的信息
export function getMyMessage(data) {
  return request("/comment/getCommentListByMyself", data)
}

// 点赞/取消点赞一体化
export function toggleLikePost(data) {
  return request('/post/thumb', data, "post")
}
//收藏帖子
export function followPost(data) {
  return request("/follow/follow", data, 'post');
}
//取消收藏帖子
export function cancelFollowPost(data) {
  return request("/follow/deletefollow", data, 'delete');
}
//举报帖子
export function reportPost(data) {
  return request("/report/report",data,'post')
}