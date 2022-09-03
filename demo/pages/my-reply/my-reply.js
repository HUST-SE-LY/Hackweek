import {
  getUserComments,
  getPostById,
  deleteComment,
} from '../../utils/request';
import {
  correctCreatedAt
} from '../../utils/util';
const app=getApp();
let startId = 0;
//节流
let isGettingList = false;
Page({
  data: {
    replyList: [],
    username: app.globalData.userInfo.userName,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getMyReply();
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    startId = 0;
    this.getMyReply()
  },
  onReachBottom: function () {
    this.getMyReply()
  },
  navigateToPost(e) {
    let id=parseInt(e.currentTarget.dataset.id);
    const res=this.getPost(id);
  },
  deleteReply(e) {
    let id=parseInt(e.currentTarget.dataset.id);
    let index=parseInt(e.currentTarget.dataset.index);
    this.deleteComments(id);
    let list=this.data.replyList;
    list.splice(index,1);
    this.setData({replyList:list});
  },
  async deleteComments(id) {
    const res=await deleteComment({commentid:id});
    console.log(res)
  },
  async getPost(id) {
    const res=await getPostById({postid:id});
    wx.navigateTo({
      url: `../../pages/index/itemDetail/itemDetail?id=${res.data.ID}&content=${res.data.Content}&username=${res.data.UserName}&price=${res.data.Price}&title=${res.data.Title}&time=${res.data.CreatedAt.split("T")[0]}&location=${res.data.Location}&isFollow=${res.data.isFollow}&isThumb=${res.data.isThumb}&isReplied=${res.data.isreplied}&follow=${res.data.Follow}&reply=${res.data.Reply}&thumb=${res.data.Thumb}&qq=${res.data.QQ}&wx=${res.data.Wx}`,
    })
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