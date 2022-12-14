import {
  getUserFollow
} from '../../utils/request'
import {
  correctTime
} from "../../utils/util";
let startId = 0;
//节流
let isGettingList = false;
Page({
  data: {
    postList: [],
    noPost:false,
    isLoading:false,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    startId=0;
    this.getMyFollowPost()
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.setData({
      postList:[],
    })
    startId = 0;
    this.getMyFollowPost();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    this.getMyFollowPost()
  },
  async getMyFollowPost() {
    if (isGettingList) return
    isGettingList = true
    try {
      this.setData({
        isLoading: true,
        noPost: false,
      })
      const res = await getUserFollow({
        limit: 20,
        offset: startId
      })
      this.setData({
        isLoading:false,
      })
      isGettingList = false;
      res.data.map((item) => {
        item.CreatedAt = correctTime(item.CreatedAt);
      })

      if (startId === 0) {
        if(res.data.length===0) {
          this.setData({
            noPost:true,
          })
        }
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