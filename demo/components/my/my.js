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
    }]
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
  }
})