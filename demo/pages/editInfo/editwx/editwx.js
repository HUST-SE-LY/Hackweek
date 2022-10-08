import {
  showToast
} from "../../../utils/wx-event"
import {
  editUserName
} from "../../../utils/request";
const App = getApp()
Page({
  data: {
    wx: "",
    isFocus:false,
  },
  onLoad (options) {
    this.setData({
      wx: App.globalData.userInfo.wx
    })
  },
  focusInput() {
    console.log("okk")
    this.setData({
      isFocus:true,
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