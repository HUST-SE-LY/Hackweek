
import {
  getUserComments,
  getUserDetail,
} from "../../utils/request/";
const App = getApp();
Component({
  properties: {

  },
  data: {
    messageNum: 20,
    messageList: [],
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
    },
    async getUser() {
      const res=await getUserDetail();
      this.setData({
        userName:res.data.Name,
      });
      App.globalData.userInfo.userName=this.data.userName;
    },
    async getComment() {//这里写错了，弄成评论了，等后端消息接口弄出来了再改
      const res=await getUserComments();
      console.log(res);
      this.setData({
        messageNum:res.data.length,
        messageList:res.data,
      })
    }
  },
  pageLifetimes: {
    show() {
      this.getUser();
      this.getComment();

    }
  }
})