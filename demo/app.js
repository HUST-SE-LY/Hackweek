// app.js
App({
  onLaunch() {
    wx.cloud.init()
    this.globalData.userInfo = wx.getStorageSync('userInfo')
  },
  globalData: {
    userInfo: {
      avatar: "/static/my.png",
      userName: "热心用户",
      qq: "未设置",
      wx: "未设置",
    },
  }
})