import {
  showToast
} from "../../../utils/wx-event"
import {
  editUserName
} from "../../../utils/request";
const App = getApp()
Page({
  data: {
    wx: ""
  },
  onLoad (options) {
    this.setData({
      wx: App.globalData.userInfo.wx
    })
  },
  clearContent() {
    this.setData({
      wx: ""
    })
  },
  async save() {
    App.globalData.userInfo.wx = this.data.wx
    await editUserName({wx:this.data.wx});
    showToast("修改成功")
    wx.navigateBack()
  }
})