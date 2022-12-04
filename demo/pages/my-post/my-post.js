import {
  correctTime
} from "../../utils/util";
import {
  getMyPost
} from '../../utils/request'
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
  onShow: function () {
    startId = 0;
    this.getPost();
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    startId = 0;
    this.getPost()
  },
  onReachBottom: function () {
    this.getPost()
  },
  async getPost() {
    if (isGettingList) return
    isGettingList = true
    try {
      console.log(startId);
      this.setData({
        isLoading:true,
        noPost:false,
      })
      const res = await getMyPost({
        offset: startId,
        limit: 10,
      });
      this.setData({
        isLoading:false,
      })
      res.data.map((item) => {
        item.CreatedAt = correctTime(item.CreatedAt)
      })
      isGettingList = false;
      if (startId === 0) {
        if(res.data.length === 0) {
          this.setData({
            noPost:true,
          })
        }
        this.setData({
          postList: res.data,
        })
        console.log(this.data.postList)
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