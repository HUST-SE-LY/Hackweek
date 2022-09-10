const tabUrlList = ["/pages/index/index", "/pages/my/my"]
const app=getApp();
Page({
  data: {
    selectedTabBarIndex: 0
  },
  switchTab(e) {
    const {
      index
    } = e.currentTarget.dataset
    if(e.currentTarget.dataset.index==1&&app.globalData.userInfo.travelMode) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    this.setData({
      selectedTabBarIndex: index
    })
  },
  onReachBottom() {
    this.selectComponent("#fair").bottomFresh();
  }
})