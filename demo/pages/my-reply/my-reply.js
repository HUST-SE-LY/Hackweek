import {
  getMyReply
} from '../../utils/request'
let startId = 0;
//节流
let isGettingList = false;
Page({
  data: {
    replyList: []
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    getMyReply()
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    startId = 0;
    getMyReply()
  },
  onReachBottom: function () {
    getMyReply()
  },
  async getMyReply() {
    if (isGettingList) return
    isGettingList = true
    try {
      const res = await getMyReply({
        limit: 20,
        offset: startId
      })
      isGettingList = false;
      if (startId === 0) {
        this.setData({
          replyList: res.data
        })
      } else {
        this.setData({
          replyList: this.data.replyList.concat(res.data)
        })
      }
      startId += res.data.length
      isGettingList = false
    } catch (err) {
      console.log(err)
      isGettingList = false
    }
  }
})