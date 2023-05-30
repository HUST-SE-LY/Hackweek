const App = getApp()
import {
  releasePostComment,
  getPostComments,
  toggleLikePost,
  followPost,
  cancelFollowPost,
  getPostById,
} from "../../../utils/request";
import {
  showToast
} from "../../../utils/wx-event";
// pages/index/itemDetail/itemDetail.js
Page({
  data: {
    postList: null,
    isLogin: false, //是否登录
    id: "", //帖子唯一id，从点入时传入
    responseid: "",
    avatar: "https://www.matto.top/avatar.png", //头像url
    userName: "", //用户名，从点入时传入
    title: "", //标题，点入时传入
    price: "", //价格，点入时传入
    content: "", //正文，从点入时传入
    location: "", //地址，点入时传入
    createAt: "", //日期，点入时传入
    qq: "", //发帖人的qq，点入时传入
    wx: "", //发帖人的微信，点入时传入
    reply: "", //回复数,点入时传入
    thumb: "", //点赞数，点入时传入
    follow: "", //收藏数，点入时传入
    isFollow: false, //是否收藏，点入时传入
    isReplied: false, //是否回复,点入时传入
    isThumb: false, //是否点赞，点入时传入
    isfocus: false, //表示回复框是否聚焦
    inputContent: "", //回复输入框中的数据
    isfooter: true, //判断底部回复输入框是否出现
    isReplyOthers: false, //判断回复他人的输入框是否出现
    placeHolderName: '', //回复他人的输入框的placeholder
    imageList: [], //帖子图片列表
    imgLargeUrl: null, //放大后的图片url
    commentsList: [],
    contactInfoShow: false,
    noComment: false,
    isreplysecond: false
  },
  releaseComment() { //正常回复
    if (this.data.inputContent) {
      this.selectComponent("#comments").reply(this.data.inputContent); //找到组件触发组件reply
      this.Comment(0);
    }
  },
  releaseReplyOthers() { //回复他人
    console.log(this.data.responseid)
    if (this.data.inputContent) {
      this.selectComponent("#comments").reply1(this.data.inputContent); //触发组件reply1
      const res = this.Comment(this.data.responseid);
      console.log(res);
      this.setData({
        inputContent: "", //清空输入框
      })
    }

  },
  closeInput() {
    this.setData({
      isfocus: false,
      isfooter: true,
      isReplyOthers: false
    }); //点击空白使输入框变为正常回复的输入框
  },

  ContactInfo() { //获取联系方式
    this.setData({
      contactInfoShow: true,
    })
  },
  hideContactInfo() {
    this.setData({
      contactInfoShow: false
    })
  },
  toLoginPage() {
    wx.navigateTo({
      url: '../../login/login',
    })
  },
  copyContactInfo(e) {
    const type = e.currentTarget.dataset.type;
    const info = e.currentTarget.dataset.type === "qq" ? e.currentTarget.dataset.qq : e.currentTarget.dataset.wx;
    console.log(info)
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
  async getComments(id) {
    this.setData({
      id: id,
    });
    let res = await getPostComments({
      postid: id
    });
    if (!res.data) {
      this.setData({
        noComment: true,
      })
      return;
    }
    for (let data of res.data) {
      if (data.ReplyComments === null) {
        data.ReplyComments = [];
      }
    }
    this.setData({
      commentList: res.data
    });
    console.log(this.data.commentList)
    let commentComponent = this.selectComponent("#comments");
    commentComponent.setData({
      commentsList: this.data.commentList ? this.data.commentList : [],
    })
  },
  async Comment(responseid) {
    console.log(this.data.isreplysecond);
    const id = this.data.id;
    const content = this.data.inputContent;
    const params = {
      postid: parseInt(id),
      content: content,
      responseid: responseid,
      fileid: App.globalData.avatarId
    }
    if (this.data.isreplysecond) params.responseUserName = this.data.placeHolderName
    const res = await releasePostComment(params);
    this.setData({ //情空输入框
      inputContent: "",
    })
  },
  async Thumb() {
    if (!this.data.isLogin) {
      this.toLoginPage();
      return false;
    }
    let num = parseInt(this.data.thumb);
    if (this.data.isThumb === false) {
      this.setData({
        isThumb: true,
        thumb: num + 1,
      });
    } else {
      this.setData({
        isThumb: false,
        thumb: num - 1,
      })
    };
    toggleLikePost({
      postid: parseInt(this.data.id)
    });
  },
  async Follow() {
    if (!this.data.isLogin) {
      this.toLoginPage();
      return false;
    }
    let num = parseInt(this.data.follow);
    if (this.data.isFollow === false) {
      followPost({
        postid: parseInt(this.data.id)
      })
      this.setData({
        isFollow: true,
        follow: num + 1,
      })
    } else {
      cancelFollowPost({
        postid: parseInt(this.data.id)
      })
      this.setData({
        isFollow: false,
        follow: num - 1,
      })
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) { //获取id和其他数据
    console.log(options)
    const post = JSON.parse(options.post);
    if (typeof post.Fileid === 'string') {
      post.Fileid = post.Fileid.split(',');
    }
    if (post.Fileid == "") {
      post.Fileid = null;
    }
    let id = options.id;
    console.log("ok")
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: true
      });
      const res = await getPostById({
        postid: id
      });
      options.isFollow = res.data.isFollow ? 'true' : 'false';
      options.isReplied = res.data.isReplied ? 'true' : "false";
      options.isThumb = res.data.isThumb ? 'true' : "false";
    }
    this.setData({
      content: options.content,
      userName: options.username,
      price: options.price,
      createAt: options.time,
      title: options.title,
      location: options.location,
      isFollow: options.isFollow.length === 5 ? false : true,
      isReplied: options.isReplied.length === 5 ? false : true,
      isThumb: options.isThumb.length === 5 ? false : true,
      follow: options.follow,
      thumb: options.thumb,
      reply: options.reply,
      qq: options.qq,
      wx: options.wx,
      avatar: options.avatar,
      imageList: options.Fileid,
      postList: [post],
    })

    console.log(this.data.postList)

    this.getComments(id); //获取评论列表(后端可能要修改一下增加offset和limit)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    //这里是刷新评论和拉取更多评论的函数
  },
  onShareAppMessage(e) {
    console.log(e)
    return {
      title: "不期而喻",
      desc: "来找找你想要的东西吧",
      path: `/pages/index/index?id=${e.target.dataset.id}&content=${e.target.dataset.content}&username=${e.target.dataset.username}&price=${e.target.dataset.price}&title=${e.target.dataset.title}&time=${e.target.dataset.time}&location=${e.target.dataset.location}&isFollow=${e.target.dataset.isfollow}&isThumb=${e.target.dataset.isthumb}&isReplied=${e.target.dataset.isreplied}&follow=${e.target.dataset.follow}&reply=${e.target.dataset.reply}&thumb=${e.target.dataset.thumb}&qq=${e.target.dataset.qq}&wx=${e.target.dataset.wx}&avatar=${e.target.dataset.avatar}`
    }
  },

})