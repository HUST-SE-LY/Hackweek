const App = getApp();
import {
  showToast
} from "../../utils/wx-event"
// components/comments/comments.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noComment: {
      value: false,
      type: Boolean,
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
    commentsList: [],
    id: "",
    name: "",
    index: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reply(content) { //一级回复的渲染
      let commentRend = {
        UserName: App.globalData.userInfo.userName, //用户名
        Content: content, //回复内容
        commentSecondList: [],
        Fileid: App.globalData.userInfo.avatar
      };
      let array = this.properties.commentsList;
      array.push(commentRend);
      this.setData({
        commentsList: array
      });
    },
    replyOthers(e) { //点击用户名后触发显示回复框以及设置index和name
      this.setData({
        id: e.currentTarget.dataset.id,
        name: e.currentTarget.dataset.name,
        index: e.currentTarget.dataset.index,
      });
      let page = getCurrentPages();
      let nowPage = page[page.length - 1];
      nowPage.setData({
        isfocus: true,
        isfooter: false,
        isReplyOthers: true,
        placeHolderName: this.data.name,
        responseid: e.currentTarget.dataset.id,
        isreplysecond: e.currentTarget.dataset.isreplysecond
      });
    },
    reply1(content) { //二级评论的渲染
      let commentRend = {
        Content: content,
        UserName: App.globalData.userInfo.userName,
      };
      let array = this.properties.commentsList[this.data.index].ReplyComments;
      array.push(commentRend);
      this.setData({
        [`commentsList[${this.data.index}].ReplyComments`]: array
      });
      let page = getCurrentPages();
      let nowPage = page[page.length - 1];
      nowPage.setData({
        isfocus: false,
        isfooter: true,
        isReplyOthers: false
      }); //隐藏二级评论输入框，显示一级评论输入框
    },
    showContactInfo(e) {
      const {
        qq,
        wx,
        avatar,
        username
      } = e.currentTarget.dataset;
      this.setData({
        contactInfoShow: true,
        contactInfo: {
          qq,
          wx,
          avatar,
          username
        }
      })
    },
    copyContactInfo(e) {
      const type = e.currentTarget.dataset.type;
      const info = e.currentTarget.dataset.info
      console.log(e.currentTarget.dataset)
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
    hideContactInfo() {
      this.setData({
        contactInfoShow: false
      })
    },
  },
  lifetimes: {
    attached() {}
  }
})