import {
  correctTime
} from "../../utils/util";
import {
  showToast
} from "../../utils/wx-event"
import {
  likePost,
  dislikePost,
  followPost,
  unfollowPost
} from "../../utils/request";
Component({
  data: {
    // 点击联系按钮出现的联系信息
    contactInfoShow: false,
    contactInfo: {
      qq: 1175526477,
      wx: null
    }
  },
  properties: {
    postList: {
      type: Array,
      value: [{
        postId: 0, //这个是唯一的标记
        userName: "matto",
        avatar: "https://www.matto.top/avatar.png", //头像url
        title: "出售旧书",
        //联系方式，不方便做对象的话也可以拆开来
        contactInfo: {
          qq: 1175526477,
          wx: null
        },
        content: "卖毛概习概，当废纸随便卖，卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖,卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖",
        price: "1r",
        location: "韵苑16栋",
        createAt: "2022-07-27 18:25:03",
        // 点赞数量和是否给它点了赞
        thumb: 11451,
        isThumb: true,
        // 回复
        reply: 114,
        isReplied: true,
        // 收藏
        follow: 11,
        isFollow: false
      }, {
        postId: 0, //这个是唯一的标记
        userName: "matto",
        avatar: "https://www.matto.top/avatar.png", //头像url
        title: "出售旧书",
        //联系方式，不方便做对象的话也可以拆开来
        contactInfo: {
          qq: 1175526477,
          wx: null
        },
        content: "卖毛概习概，当废纸随便卖，卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖,卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖",
        price: "1r",
        location: "韵苑16栋",
        createAt: "2022-07-27 18:25:03",
        // 点赞数量和是否给它点了赞
        thumb: 114514,
        isThumb: false,
        // 回复
        reply: 114514,
        isReplied: false,
        // 收藏
        follow: 114514,
        isFollow: false
      }, {
        postId: 1, //这个是唯一的标记
        userName: "matto",
        avatar: "https://www.matto.top/avatar.png", //头像url
        title: "出售旧书",
        //联系方式，不方便做对象的话也可以拆开来
        contactInfo: {
          qq: 1175526477,
          wx: null
        },
        content: "卖毛概习概，当废纸随便卖，卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖,卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖",
        price: "1r",
        location: "韵苑16栋",
        createAt: "2022-07-27 18:25:03",
        // 点赞数量和是否给它点了赞
        thumb: 114514,
        isThumb: false,
        // 回复
        reply: 114514,
        isReplied: false,
        // 收藏
        follow: 114514,
        isFollow: false
      }, {
        postId: 2, //这个是唯一的标记
        userName: "matto",
        avatar: "https://www.matto.top/avatar.png", //头像url
        title: "出售旧书",
        //联系方式，不方便做对象的话也可以拆开来
        contactInfo: {
          qq: 1175526477,
          wx: null
        },
        content: "卖毛概习概，当废纸随便卖，卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖,卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖",
        price: "1r",
        location: "韵苑16栋",
        createAt: "2022-07-27 18:25:03",
        // 点赞数量和是否给它点了赞
        thumb: 114514,
        isThumb: false,
        // 回复
        reply: 114514,
        isReplied: false,
        // 收藏
        follow: 114514,
        isFollow: false
      }, {
        postId: 3, //这个是唯一的标记
        userName: "matto",
        avatar: "https://www.matto.top/avatar.png", //头像url
        title: "出售旧书",
        //联系方式，不方便做对象的话也可以拆开来
        contactInfo: {
          qq: 1175526477,
          wx: null
        },
        content: "卖毛概习概，当废纸随便卖，卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖,卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖",
        price: "1r",
        location: "韵苑16栋",
        createAt: "2022-07-27 18:25:03",
        // 点赞数量和是否给它点了赞
        thumb: 114514,
        isThumb: false,
        // 回复
        reply: 114514,
        isReplied: false,
        // 收藏
        follow: 114514,
        isFollow: false
      }, {
        postId: 4, //这个是唯一的标记
        userName: "matto",
        avatar: "https://www.matto.top/avatar.png", //头像url
        title: "出售旧书",
        //联系方式，不方便做对象的话也可以拆开来
        contactInfo: {
          qq: 1175526477,
          wx: null
        },
        content: "卖毛概习概，当废纸随便卖，卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖,卖毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖卖,毛概习概，当废纸随便卖",
        price: "1r",
        location: "韵苑16栋",
        createAt: "2022-07-27 18:25:03",
        // 点赞数量和是否给它点了赞
        thumb: 114514,
        isThumb: false,
        // 回复
        reply: 114514,
        isReplied: false,
        // 收藏
        follow: 114514,
        isFollow: false
      }]
    },
  },
  lifetimes: {
    attached() {
      this.data.postList.map((item) => {
        item.createAt = correctTime(item.createAt)
      })
      this.setData({
        postList: this.data.postList
      })
    }
  },
  methods: {
    intoDetailPage(id) {
      wx.navigateTo({
        url: `../../pages/index/itemDetail/itemDetail?id=${id.currentTarget.dataset.id}`,
      })
    },
    async toggleThumbup(e) {
      const {
        id,
        index
      } = e.currentTarget.dataset;
      if (this.data.postList[index].isThumb) {
        this.data.postList[index].thumb--;
        this.data.postList[index].isThumb = false;
        await likePost({
          id
        })
      } else {
        this.data.postList[index].thumb++;
        this.data.postList[index].isThumb = true;
        await dislikePost({
          id
        })
      }
      this.setData({
        postList: this.data.postList
      })
    },
    async toggleFollow(e) {
      const {
        id,
        index
      } = e.currentTarget.dataset;
      if (this.data.postList[index].isFollow) {
        this.data.postList[index].follow--;
        this.data.postList[index].isFollow = false;
        await followPost({
          id
        })
      } else {
        this.data.postList[index].follow++;
        this.data.postList[index].isFollow = true;
        await unfollowPost({
          id
        })
      }
      this.setData({
        postList: this.data.postList
      })
    },
    //联系方式复制
    copyContactInfo(e) {
      const {
        info,
        type
      } = e.currentTarget.dataset;
      wx.setClipboardData({
        data: String(info),
        success(res) {
          if (type === "qq")
            showToast("QQ号已复制")
          else
            showToast("微信号已复制")
        }
      })
    },
    showContactInfo(e) {
      const {
        info
      } = e.currentTarget.dataset;
      this.setData({
        contactInfoShow: true,
        contactInfo: info
      })
    },
    hideContactInfo() {
      this.setData({
        contactInfoShow: false
      })
    },
    // 举报
    reportPost(e) {
      const {
        id
      } = e.currentTarget.dataset;
    }
  }
})