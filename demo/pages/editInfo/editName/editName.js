const App = getApp()
import {
  showToast
} from "../../../utils/wx-event"
Page({
  data: {
    userName: ""
  },
  onLoad: function (options) {
    this.setData({
      userName: App.globalData.userInfo.userName
    })
  },
  clearContent() {
    this.setData({
      userName: ""
    })
  },
  save() {
    if (this.data.userName.length === 0) showToast("用户名不能为空哦")
    else {
      App.globalData.userInfo.userName = this.data.userName
      wx.setStorageSync('userInfo', App.globalData.userInfo)
      wx.navigateBack()
    }
  }
})