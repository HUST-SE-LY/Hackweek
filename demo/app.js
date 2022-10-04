// app.js
App({
  onLaunch() {
    wx.cloud.init();
    if (!wx.getStorageSync('token')) {
      wx.reLaunch({
        url: './pages/login/login',
      })
    }
  },
  globalData: {
    userInfo: {
      avatarId:"",
      travelMode: false,
      avatar: "",
      userName: "热心用户",
      qq: "",
      wx: "",
      userid: 1
    },
  }
})