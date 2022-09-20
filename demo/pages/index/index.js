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
      wx.reLaunch({
        url: '../login/login',
      })
    }
    this.setData({
      selectedTabBarIndex: index
    })
  },
  onReachBottom() {
    this.selectComponent("#fair").bottomFresh();
  },
  onShareAppMessage(e) {
    console.log(e)
    return {
      title:"不期而喻",
      desc:"来找找你想要的东西吧",
      path:`/pages/index/itemDetail/itemDetail?id=${e.target.dataset.id}&content=${e.target.dataset.content}&username=${e.target.dataset.username}&price=${e.target.dataset.price}&title=${e.target.dataset.title}&time=${e.target.dataset.time}&location=${e.target.dataset.location}&isFollow=${e.target.dataset.isfollow}&isThumb=${e.target.dataset.isthumb}&isReplied=${e.target.dataset.isreplied}&follow=${e.target.dataset.follow}&reply=${e.target.dataset.reply}&thumb=${e.target.dataset.thumb}&qq=${e.target.dataset.qq}&wx=${e.target.dataset.wx}&avatar=${e.target.dataset.avatar}`

    }
  }
})