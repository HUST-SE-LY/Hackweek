
import {
  releasePostComment,
  getPostComments,
  toggleLikePost,
  toggleFollowPost,
} from "../../../utils/request";
import {
  showToast
} from "../../../utils/wx-event";
// pages/index/itemDetail/itemDetail.js
Page({
  data: {
    id:"",//帖子唯一id，从点入时传入
    avatar:"https://www.matto.top/avatar.png",//头像url
    userName:"",//用户名，从点入时传入
    title:"",//标题，点入时传入
    price:"",//价格，点入时传入
    content:"",//正文，从点入时传入
    location:"",//地址，点入时传入
    createAt:"",//日期，点入时传入
    qq:"",//发帖人的qq，点入时传入
    wx:"",//发帖人的微信，点入时传入
    reply:"",//回复数,点入时传入
    thumb:"",//点赞数，点入时传入
    follow:"",//收藏数，点入时传入
    isFollow:false,//是否收藏，点入时传入
    isReplied:false,//是否回复,点入时传入
    isThumb:false,//是否点赞，点入时传入
    isfocus:false,//表示回复框是否聚焦
    inputContent:"",//回复输入框中的数据
    isfooter:true,//判断底部回复输入框是否出现
    isReplyOthers:false,//判断回复他人的输入框是否出现
    placeHolderName:'',//回复他人的输入框的placeholder
    imageList:["https://www.matto.top/avatar.png","https://www.matto.top/avatar.png","https://www.matto.top/avatar.png","https://www.matto.top/avatar.png","https://www.matto.top/avatar.png"],//帖子图片列表
    imgLargeUrl:null,//放大后的图片url
    commentsList:[],
    contactInfoShow:false,
  },
  releaseComment() {//正常回复
    if(this.data.inputContent) {
      this.selectComponent("#comments").reply(this.data.inputContent);//找到组件触发组件reply
      this.Comment(0);
    }
  },
  releaseReplyOthers() {//回复他人
    if(this.data.inputContent) {
      this.selectComponent("#comments").reply1(this.data.inputContent);//触发组件reply1
      this.setData({
        inputContent:"",//清空输入框
      })
    }
    
  },
  closeInput() {
    this.setData({isfocus:false,isfooter:true,isReplyOthers:false});//点击空白使输入框变为正常回复的输入框
  },
  imgLarge(e){//放大图片
    let content=e.currentTarget.dataset.url
    this.setData({imgLargeUrl: content,});//设置放大后的图片url
  },
  imageLargeClose() {//关闭图片放大
    this.setData({imgLargeUrl: null,});//点击空白取消放大查看
  },
  ContactInfo() {//获取联系方式
    this.setData({
      contactInfoShow: true,
    })
  },
  hideContactInfo() {
    this.setData({
      contactInfoShow: false
    })
  },
  copyContactInfo(e) {
    const type=e.currentTarget.dataset.type;
    const info=e.currentTarget.dataset.type==="qq"?e.currentTarget.dataset.qq:e.currentTarget.dataset.wx;
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
    this.setData({id: id,});
    const res=await getPostComments({postid : id});
    this.setData({commentList:res.data});
    let commentComponent=this.selectComponent("#comments");
    commentComponent.setData({
      commentsList: this.data.commentList?this.data.commentList:[],
    })
  },
  async Comment(responseid) {
    const id=this.data.id;
    const content=this.data.inputContent;
    const res=await releasePostComment({
      postid : parseInt(id),
      content : content,
      responseid : responseid,
    });
    this.setData({//情空输入框
      inputContent:"",
    })
  },
  async Thumb() {
    let num=parseInt(this.data.thumb);
    if(this.data.isThumb===false) {
      this.setData({
        isThumb:true,
        thumb:num+1,
      });
    } else {
      this.setData({
        isThumb:false,
        thumb:num-1,
      })
    };
    toggleLikePost({postid:parseInt(this.data.id)});
  },
  async Follow() {
    let num=parseInt(this.data.follow);
    if(this.data.isFollow===false) {
      this.setData({
        isFollow:true,
        follow:num+1,
      })
    } else {
      this.setData({
        isFollow:false,
        follow: num-1,
      })
    };
    toggleFollowPost({postid:parseInt(this.data.id)})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {//获取id和其他数据
      let id=options.id;
      console.log(options)
      this.setData({
        content:options.content,
        userName:options.username,
        price:options.price+"￥",
        createAt:options.time,
        title:options.title,
        location:options.location,
        isFollow:options.isFollow.length===5?false:true,
        isReplied:options.isReplied.length===5?false:true,
        isThumb:options.isThumb.length===5?false:true,
        follow:options.follow,
        thumb:options.thumb,
        reply:options.reply,
        qq:options.qq,
        wx:options.wx,

      })
      this.getComments(id);//获取评论列表(后端可能要修改一下增加offset和limit)
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
//这里是刷新评论和拉取更多评论的函数
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
//分享内容的函数
  }
})
