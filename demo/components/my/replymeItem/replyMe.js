// components/my/replyMe.js
import {
  getPostById
} from '../../../utils/request.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageList: []
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async toDetailPage(e) {
      const postid = e.currentTarget.dataset.postid;
      const res = await getPostById({
        postid: postid,
      })
      console.log(res)
      await wx.navigateTo({
        url: `../../pages/index/itemDetail/itemDetail?id=${res.data.ID}&content=${res.data.Content}&username=${res.data.UserName}&price=${res.data.Price}&title=${res.data.Title}&time=${res.data.CreatedAt}&location=${res.data.Location}&isFollow=${res.data.isFollow}&isThumb=${res.data.isThumb}&isReplied=${res.data.isReplied}&follow=${res.data.Follow}&reply=${res.data.Reply}&thumb=${res.data.Thumb}&qq=${res.data.QQ}&wx=${res.data.Wx}&avatar=${res.data.Avatar}&post=${JSON.stringify(res.data)}`,
      })
    },
  }
})