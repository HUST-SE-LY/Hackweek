import {
  getMyPost
} from '../../utils/request'
let startId = 0;
//节流
let isGettingList = false;
Page({
  data: {
    postList: []
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    getMyPost()
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    startId = 0;
    getMyPost()
  },
  onReachBottom: function () {
    getMyPost()
  },
  async getMyPost() {
    if (isGettingList) return
    isGettingList = true
    try {
      const res = await getMyPost({
        limit: 20,
        offset: startId
      })
      isGettingList = false;
      if (startId === 0) {
        this.setData({
          postList: res.data
        })
      } else {
        this.setData({
          postList: this.data.postList.concat(res.data)
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