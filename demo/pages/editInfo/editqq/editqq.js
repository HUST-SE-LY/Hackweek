const App = getApp()
import {
  showToast
} from "../../../utils/wx-event"
import {
  editUserInfo
} from "../../../utils/request";
Page({
  data: {
    qq: "",
    isFocus:false,
  },
  onLoad(options) {
    this.setData({
      qq: App.globalData.userInfo.qq
    })
  },
  clearContent() {
    this.setData({
      qq: ""
    })
  },
  focusInput() {
    console.log("okk")
    this.setData({
      isFocus:true,
    })
  },
  async save() {
    await editUserInfo({qq:this.data.qq});
    App.globalData.userInfo.qq = this.data.qq
    wx.navigateBack()
    showToast("修改成功")
  }
})