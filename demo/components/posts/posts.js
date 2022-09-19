import {
  showToast
} from "../../utils/wx-event"
import {
  followPost,
  cancelFollowPost,
  toggleLikePost,
} from "../../utils/request";
let app=getApp();
Component({
  data: {
    // 点击联系按钮出现的联系信息
    contactInfoShow: false,
    contactInfo: {
      qq: 1175526477,
      wx: null
    },
    content:"",
  },
  properties: {
    postList: {
      type: Array,
      value: []
    },
    editMode: {
      type:Boolean,
      value:false
    },
  },
  lifetimes: {
    ready() {

    }
  },
  methods: {
    intoDetailPage(e) {
      if(app.globalData.userInfo.travelMode) {
        wx.reLaunch({
          url: '../../pages/login/login',
        })
      } else {
        wx.navigateTo({
          url: `../../pages/index/itemDetail/itemDetail?id=${e.currentTarget.dataset.id}&content=${e.currentTarget.dataset.content}&username=${e.currentTarget.dataset.username}&price=${e.currentTarget.dataset.price}&title=${e.currentTarget.dataset.title}&time=${e.currentTarget.dataset.time}&location=${e.currentTarget.dataset.location}&isFollow=${e.currentTarget.dataset.isfollow}&isThumb=${e.currentTarget.dataset.isthumb}&isReplied=${e.currentTarget.dataset.isreplied}&follow=${e.currentTarget.dataset.follow}&reply=${e.currentTarget.dataset.reply}&thumb=${e.currentTarget.dataset.thumb}&qq=${e.currentTarget.dataset.qq}&wx=${e.currentTarget.dataset.wx}&avatar=${e.currentTarget.dataset.avatar}`,
        })
      }
      
    },
    navigateToEditPage(e) {
      wx.navigateTo({
        url: `../../pages/my-post/editPost/editPost?id=${e.currentTarget.dataset.id}&content=${e.currentTarget.dataset.content}&price=${e.currentTarget.dataset.price}&title=${e.currentTarget.dataset.title}&location=${e.currentTarget.dataset.location}&tag=${e.currentTarget.dataset.tag}`,
      })
    },
    async toggleThumbup(e) {
      const {
        id,
        index
      } = e.currentTarget.dataset;
      if (this.data.postList[index].isThumb) {
        this.data.postList[index].Thumb--;
        this.data.postList[index].isThumb = false;
        await toggleLikePost({
          postid: id
        })
      } else {
        this.data.postList[index].Thumb++;
        this.data.postList[index].isThumb = true;
        await toggleLikePost({
          postid: id
        })
      }
      this.setData({
        postList: this.data.postList
      })
    },
    async toggleFollow(e) {
      const {
        id,
        index
      } = e.currentTarget.dataset;
      if (this.data.postList[index].isFollow) {
        this.data.postList[index].Follow--;
        this.data.postList[index].isFollow = false;
        await cancelFollowPost({
          postid: id
        })
      } else {
        this.data.postList[index].Follow++;
        this.data.postList[index].isFollow = true;
        await followPost({
          postid: id
        })
      }
      this.setData({
        postList: this.data.postList
      })
    },
    //联系方式复制
    copyContactInfo(e) {
      const {
        info,
        type
      } = e.currentTarget.dataset;
      wx.setClipboardData({
        data: String(info),
        success(res) {
          if (type === "qq")
            showToast("QQ号已复制")
          else
            showToast("微信号已复制")
        }
      })
    },
    showContactInfo(e) {
      const {
        qq,
        wx
      } = e.currentTarget.dataset;
      this.setData({
        contactInfoShow: true,
        contactInfo: {
          qq,
          wx
        }
      })
    },
    hideContactInfo() {
      this.setData({
        contactInfoShow: false
      })
    },
    // 举报
    reportPost(e) {
      const {
        id
      } = e.currentTarget.dataset;
    }
  }
})