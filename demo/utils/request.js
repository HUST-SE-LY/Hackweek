// const axios = require('./axios')
import {
  showToast
} from "./wx-event"
//使用Promise封装的意义在于：wx提供的原生接口是通过给success和false属性值来实现回调，如果想要做一些异步操作的话只能把异步操作的一大串代码当成参数传到函数里，然后函数再把这些参数作为success的属性值，不是很美观）而用Promise封装一下就可以使用传统的then或者async await来处理异步操作。同时统一封装也可以统一掉envId、Content-Type这种共用的参数
function request(path, data, method, contentType, header) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://1037buqieryu.cn${path}`,
      data,
      method,
      success(res) {
        resolve(res)
      }
    })
  }
  ).then((res) => {
    console.log(res)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      resolve(res.data)
    } else {
      // 这个看后端有没有好好写errMsg，好好写的话可以统一拿errMsg做toast内容
      // showToast(res.errMsg);
      reject(res)
    }
  }).catch((err) => {
    console.log(err)
    reject(err)
  });
}

function cloudUploadFile(cloudPath, filePath) {
  return new Promise((resolve, reject) => {
    
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
  return request("/report/report", data, 'post')
}