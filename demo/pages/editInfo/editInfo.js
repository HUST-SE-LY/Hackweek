const App = getApp()
Page({
  data: {
    avatar: "",
    userName: "小明",
    qq: "null",
    wx: "null"
  },
  onShow: function () {
    const {
      avatar,
      userName,
      qq,
      wx
    } = App.globalData.userInfo
    this.setData({
      avatar,userName,qq,wx
    })
  },
  navigateToEditName() {
    wx.navigateTo({
      url: '/pages/editInfo/editName/editName',
    })
  }
})