const App = getApp()
import {
  showToast
} from "../../../utils/wx-event"
import {
  editUserName
} from "../../../utils/request";
Page({
  data: {
    qq: ""
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
  async save() {
    await editUserName({qq:this.data.qq});
    App.globalData.userInfo.qq = this.data.qq
    wx.navigateBack()
    showToast("修改成功")
  }
})