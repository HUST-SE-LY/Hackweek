
import {
  getUserComments,
  getUserDetail,
  getUserPostNum,
  getUserReplyNum,
  getUserFollowNum,
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
      const res1=await getUserDetail();
      const res2=await getUserFollowNum();
      const res3=await getUserPostNum();
      const res4=await getUserReplyNum();
      console.log(res2)
      console.log(res3);
      console.log(res4);
      this.setData({
        userName:res1.data.Name,
        followNum:res2.data.count,
        replyNum:res4.data.count,
        itemNum:res3.data.count,
      });
      App.globalData.userInfo.userName=this.data.userName;
      App.globalData.userInfo.qq=res1.data.QQ;
      App.globalData.userInfo.wx=res1.data.Wx;
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