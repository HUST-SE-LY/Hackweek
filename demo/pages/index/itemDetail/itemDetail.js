// pages/index/itemDetail/itemDetail.js
Page({
  data: {
    id:"",
    avatar:"https://www.matto.top/avatar.png",
    userName:"matto",
    title:"这是一个标题",
    price:"100",
    content:"这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文",
    location:"韵苑校区",
    createAt:"7月29日",
    reply:"100",
    thumb:"100",
    isReplied:true,
    isThumb:true,
    isfocus:false,//表示回复框是否聚焦
    inputContent:"",
    isfooter:true,
    isReplyOthers:false,
    placeHolderName:'',
  },
  releaseComment() {
    console.log("ok")
    this.selectComponent("#comments").reply(this.data.inputContent);
    this.setData({
      inputContent:"",
    })
  },
  releaseReplyOthers() {
    this.selectComponent("#comments").reply1(this.data.inputContent);
    this.setData({
      inputContent:"",
    })
  },
  closeInput() {
    this.setData({isfocus:false,isfooter:true,isReplyOthers:false});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      let id=options.id;
      this.setData({id: id,});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})