
import {
  getAvatar,
  getMyMessage,
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
    id:null,//用户id
    avatar:null,
    messageNum: 20,
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
        id:res.ID,
        userName: res.Name,
        followNum: follow,
        replyNum: reply,
        itemNum: post,
      });
      this.getMessage();
      this.getMyAvatar();


      //把更新userInfo放这了，就不放App.js里了
      App.globalData.userInfo = Object.assign(App.globalData.userInfo, {
        userid:res.ID,
        avatar: this.data.avatar,
        userName: res.Name,
        qq: res.QQ,
        wx: res.Wx,
        userid: res.ID
      })
    },
    async getMyAvatar() {
      wx.cloud.getTempFileURL({
        fileList: [`cloud://prod-7gigvlg43eb566e9.7072-prod-7gigvlg43eb566e9-1313093695/avatar/avatar-${this.data.id}`], // 文件唯一标识符 cloudID, 可通过上传文件接口获取
        success: (res)=>{
          console.log(res)
          this.setData({
            avatar:res.fileList[0].tempFileURL,
          });
          App.globalData.userInfo.avatar=this.data.avatar;

        },
        fail: console.error
      })
      
    },
    async getMessage() {
      let that=this;
      const res=await getMyMessage({
        offset:0,
        limit:20,
      });
      that.setData({
        messageList:res.data.filter((value)=>{
          return value.UserName!==App.globalData.userInfo.userName;
        }),
      })
      that.setData({
        messageNum:this.data.messageList.length
      })
    }
  },
  async toDetailPage(e) {
    const postid=e.currentTarget.dataset.postid;
    
  },
  pageLifetimes: {
    show() {
    this.getUser();
    }
  }
})