const App = getApp()
import {
  uploadAvatar
} from '../../utils/request'
import {
  formatTime
} from "../../utils/util"
Page({
  data: {
    avatar: "",
    userName: "小明",
    qq: "null",
    wx: "null",
    highLightInfo: false
  },
  onShow() {
    this.loadInfo()
    if (!(App.globalData.userInfo.qq.length || App.globalData.userInfo.wx.length)) {
      this.setData({
        highLightInfo: true
      })
    } else {
      this.setData({
        highLightInfo: false
      })
    }
  },
  // 下面有一次复用，所以写成了函数
  loadInfo() {
    const {
      avatar,
      userName,
      qq,
      wx
    } = App.globalData.userInfo
    this.setData({
      avatar,
      userName,
      qq,
      wx
    })
  },
  navigateToEditName() {
    wx.navigateTo({
      url: '/pages/editInfo/editName/editName',
    })
  },
  navigateToEditQQ() {
    wx.navigateTo({
      url: '/pages/editInfo/editqq/editqq',
    })
  },
  navigateToEditWx() {
    wx.navigateTo({
      url: '/pages/editInfo/editwx/editwx',
    })
  },
  showModal() {
    wx.showModal({
      title: "确定退出？",
      confirmColor: "black",
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('token', ""),
            App.globalData.userInfo = {
              travelMode: true,
              avatar: "/static/my.png",
              userName: "未登录",
              qq: "未设置",
              wx: "未设置",
            }
          wx.navigateTo({
            url: '../index/index',
          })
        } else if (res.cancel) {

        }

      }
    })
  },
  chooseAvatar() {
    let that = this;
    wx.chooseMedia({
      mediaType: 'image',
      count: 1,
      success: async (res) => {
        that.setData({
          avatar: res.tempFiles[0].tempFilePath,
        });
        uploadAvatar(res.tempFiles[0].tempFilePath)
      }
    })
  }
})