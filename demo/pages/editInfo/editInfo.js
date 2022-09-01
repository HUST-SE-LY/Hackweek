const App = getApp()
Page({
  data: {
    avatar: "",
    userName: "小明",
    qq: "null",
    wx: "null"
  },
  onShow: function () {
    this.loadInfo()
  },
  // 下面有一次复用，所以写成了函数
  loadInfo() {
    const {
      avatar,
      userName,
      qq,
      wx
    } = App.globalData.userInfo
    this.setData({
      avatar,
      userName,
      qq,
      wx
    })
  },
  navigateToEditName() {
    wx.navigateTo({
      url: '/pages/editInfo/editName/editName',
    })
  },
  navigateToEditQQ() {
    wx.navigateTo({
      url: '/pages/editInfo/editqq/editqq',
    })
  },
  navigateToEditWx() {
    wx.navigateTo({
      url: '/pages/editInfo/editwx/editwx',
    })
  },
  showModal() {
    wx.showModal({
      title: "确定退出？",
      confirmColor: "black",
      success: () => {
        wx.setStorageSync('token', ""),
          App.globalData.userInfo = {
            avatar: "/static/my.png",
            userName: "热心用户",
            qq: "未设置",
            wx: "未设置",
          }
        this.loadInfo()
        wx.setStorageSync('userInfo', App.globalData.userInfo)
      }
    })
  }
})