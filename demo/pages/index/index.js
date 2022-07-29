const tabUrlList = ["/pages/index/index", "/pages/my/my"]
Page({
  data: {
    selectedTabBarIndex: 0
  },
  switchTab(e) {
    const {
      index
    } = e.currentTarget.dataset
    console.log(index)
    this.setData({
      selectedTabBarIndex: index
    })
  }
})