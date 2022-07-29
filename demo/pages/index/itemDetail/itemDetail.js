// pages/index/itemDetail/itemDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    avatar:"https://www.matto.top/avatar.png",
    userName:"matto",
    title:"这是一个标题",
    price:"100",
    content:"这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文",
    location:"韵苑校区",
    createAt:"7月29日",
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