import {
  showToast
} from "../../../utils/wx-event"
const App = getApp()
Page({
  data: {
    wx: ""
  },
  onLoad: function (options) {
    this.setData({
      wx: App.globalData.userInfo.wx
    })
  },
  clearContent() {
    this.setData({
      wx: ""
    })
  },
  save() {
    App.globalData.userInfo.wx = this.data.wx
    wx.setStorageSync('userInfo', App.globalData.userInfo)
    showToast("修改成功")
    wx.navigateBack()
  }
})