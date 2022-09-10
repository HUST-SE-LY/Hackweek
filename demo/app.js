// app.js
App({
  onLaunch() {
    wx.cloud.init();
    if(!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: './pages/login/login',
      })
    }
  },
  globalData: {
    userInfo: {
      travelMode:false,
      avatar: "/static/my.png",
      userName: "热心用户",
      qq: "未设置",
      wx: "未设置",
    },
  }
})