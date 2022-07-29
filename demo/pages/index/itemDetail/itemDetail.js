// pages/index/itemDetail/itemDetail.js
Page({
  data: {
    id:"",//帖子唯一id，从点入时传入
    avatar:"https://www.matto.top/avatar.png",//头像url
    userName:"matto",//用户名
    title:"这是一个标题",//标题
    price:"100￥",//价格
    content:"这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文",//正文
    location:"韵苑校区",//地址
    createAt:"7月29日",//日期
    reply:"100",//回复数
    thumb:"100",//点赞数
    isReplied:true,//是否回复
    isThumb:true,//是否点赞
    isfocus:false,//表示回复框是否聚焦
    inputContent:"",//回复输入框中的数据
    isfooter:true,//判断底部回复输入框是否出现
    isReplyOthers:false,//判断回复他人的输入框是否出现
    placeHolderName:'',//回复他人的输入框的placeholder
    imageList:["https://www.matto.top/avatar.png","https://www.matto.top/avatar.png","https://www.matto.top/avatar.png","https://www.matto.top/avatar.png","https://www.matto.top/avatar.png"],//帖子图片列表
    imgLargeUrl:null,//放大后的图片url

  },
  releaseComment() {//正常回复
    this.selectComponent("#comments").reply(this.data.inputContent);//找到组件触发组件reply
    this.setData({//情空输入框
      inputContent:"",
    })
  },
  releaseReplyOthers() {//回复他人
    this.selectComponent("#comments").reply1(this.data.inputContent);//触发组件reply1
    this.setData({
      inputContent:"",//清空输入框
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {//获取id和其他数据
      let id=options.id;
      this.setData({id: id,});
      //这里还有一个获取data数据的东西
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