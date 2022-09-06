const App = getApp()
import {
  showToast
} from "../../../utils/wx-event"
Page({
  data: {
    qq: ""
  },
  onLoad(options) {
    console.log(App.globalData.userInfo.qq)
    this.setData({
      qq: App.globalData.userInfo.qq
    })
  },
  clearContent() {
    this.setData({
      qq: ""
    })
  },
  save() {
    console.log(App.globalData.userInfo.qq)
    App.globalData.userInfo.qq = this.data.qq
    wx.navigateBack()
    showToast("修改成功")
  }
})