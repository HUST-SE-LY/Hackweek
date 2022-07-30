// app.js
App({
  onLaunch() {
    wx.cloud.init()
  },
  globalData: {
    userInfo: null
  }
})
