import {
  correctTime
} from "../../utils/util";
Component({
  data: {
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
        thumb: 114514,
        isThumb: false,
        // 回复
        reply: 114514,
        isReplied: false,
        // 收藏
        follow: 114514,
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
  }
})