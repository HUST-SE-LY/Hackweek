const tabUrlList = ["/pages/index/index", "/pages/my/my"]
const app = getApp();
import {
  showToast
} from "../../utils/wx-event"
Page({
  data: {
    selectedTabBarIndex: 0
  },
  navigateToWritePage() {
    if (app.globalData.userInfo.travelMode) {
      wx.reLaunch({
        url: '../../pages/login/login',
      })
    } else {
      if (!(app.globalData.userInfo.qq && app.globalData.userInfo.qq.length || app.globalData.userInfo.qq && app.globalData.userInfo.wx.length)) {
        showToast("请至少完善一种用户联系方式~")
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/editInfo/editInfo?needInfo=true"
          })
        }, 1000)
      } else {
        wx.navigateTo({
          url: '/pages/index/newItem/newItem',
        })
      }
    }
  },
  switchTab(e) {
    const {
      index
    } = e.currentTarget.dataset
    if (e.currentTarget.dataset.index == 1 && app.globalData.userInfo.travelMode) {
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
  onPullDownRefresh() {
    this.selectComponent("#fair").topFresh();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage(e) {
    console.log(e)
    return {
      title: "不期而喻",
      desc: "来找找你想要的东西吧",
      path: `/pages/index/index?id=${e.target.dataset.id}&content=${e.target.dataset.content}&username=${e.target.dataset.username}&price=${e.target.dataset.price}&title=${e.target.dataset.title}&time=${e.target.dataset.time}&location=${e.target.dataset.location}&isFollow=${e.target.dataset.isfollow}&isThumb=${e.target.dataset.isthumb}&isReplied=${e.target.dataset.isreplied}&follow=${e.target.dataset.follow}&reply=${e.target.dataset.reply}&thumb=${e.target.dataset.thumb}&qq=${e.target.dataset.qq}&wx=${e.target.dataset.wx}&avatar=${e.target.dataset.avatar}`

    }
  },
  onLoad(e) {
    if (e.id) {
      wx.navigateTo({
        url: `./itemDetail/itemDetail?id=${e.id}&content=${e.content}&username=${e.username}&price=${e.price}&title=${e.title}&time=${e.time}&location=${e.location}&isFollow=${e.isFollow}&isThumb=${e.isThumb}&isReplied=${e.isReplied}&follow=${e.follow}&reply=${e.reply}&thumb=${e.thumb}&qq=${e.qq}&wx=${e.wx}&avatar=${e.avatar}`,
      })
    }
  }
})