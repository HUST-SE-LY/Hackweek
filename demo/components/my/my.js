const App = getApp();
Component({
  properties: {

  },
  data: {
    messageNum: 20,
    messageList: [{
      userName: "matto",
      content: "这是一"
    }, {
      userName: "matto",
      content: "123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456123456123456"
    }, {
      userName: "matto",
      content: "123456123456123456123456123456123456123456123456123456123456"
    }],
    userName: "",
    followNum: 111,
    replyNum: 222,
    itemNum: 333
  },
  methods: {
    navigateToMyFollowPage() {
      wx.navigateTo({
        url: '/pages/my-follow/my-follow',
      })
    },
    navigateToMyPostPage() {
      wx.navigateTo({
        url: '/pages/my-post/my-post',
      })
    },
    navigateToMyReplyPage() {
      wx.navigateTo({
        url: '/pages/my-reply/my-reply',
      })
    },
    navigateToEditPage() {
      wx.navigateTo({
        url: '/pages/editInfo/editInfo',
      })
    }
  },
  pageLifetimes: {
    show() {
      this.setData({
        userName: App.globalData.userInfo.userName
      })
    }
  }
})