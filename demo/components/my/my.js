import {
  getAvatar,
  getMyMessage,
  getUserDetail,
  getUserPostNum,
  getUserReplyNum,
  getUserFollowNum,
  editUserName
} from "../../utils/request/";
const App = getApp();
Component({
  properties: {

  },
  data: {
    id: null, //用户id
    avatar: null,
    messageNum: 0,
    messageList: [],
    userName: "",
    followNum: 0,
    replyNum: 0,
    itemNum: 0
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
    },
    async getUser() {
      const res = (await getUserDetail()).data;
      const follow = (await getUserFollowNum()).data.count;
      const reply = (await getUserReplyNum()).data.count;
      const post = (await getUserPostNum()).data.count;
      this.setData({
        id: res.ID,
        userName: res.Name,
        followNum: follow,
        replyNum: reply,
        itemNum: post,
        avatar: res.fileid,
      });
      this.getMessage();
      //把更新userInfo放这了，就不放App.js里了
      App.globalData.userInfo = Object.assign(App.globalData.userInfo, {
        userid: res.ID,
        avatar: res.fileid,
        userName: res.Name,
        qq: res.QQ,
        wx: res.Wx,
        userid: res.ID
      })
    },
    async getMessage() {
      let that = this;
      const res = await getMyMessage({
        offset: 0,
        limit: 20,
      });
      that.setData({
        messageList: res.data.filter((value) => {
          return value.UserName !== App.globalData.userInfo.userName;
        }),
      })
      that.setData({
        messageNum: this.data.messageList.length
      })
    }
  },
  pageLifetimes: {
    show() {
      this.getUser();
    }
  }
})