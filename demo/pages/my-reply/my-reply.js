import {
  getUserComments
} from '../../utils/request';
import {
  correctCreatedAt
} from '../../utils/util';

let startId = 0;
//节流
let isGettingList = false;
Page({
  data: {
    replyList: []
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getMyReply()
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    startId = 0;
    this.getMyReply()
  },
  onReachBottom: function () {
    this.getMyReply()
  },
  async getMyReply() {
    if (isGettingList) return
    isGettingList = true
    try {
      const res = await getUserComments()
      isGettingList = false;
      //因为后端没给范围参数，也许后面会修改
      // if (startId === 0) {
      //   this.setData({
      //     replyList: res.data
      //   })
      // } else {
      //   this.setData({
      //     replyList: this.data.replyList.concat(res.data)
      //   })
      // }
      // startId += res.data.length
      this.setData({replyList:res.data});
      let arrayDate=this.data.replyList;
      for(let date of arrayDate) {
        date.CreatedAt=correctCreatedAt(date.CreatedAt);
      }
      this.setData({replyList:arrayDate.reverse()});

    } catch (err) {
      console.log(err)
      isGettingList = false
    }
  },
})