import {
  correctTime
} from "../../utils/util";
import {
  getPostsList
} from '../../utils/request'
let startId = 0; //请求起始标号
let isGettingList = false; //限流
Component({
  data: {
    serachBarFoucus: false, //用于标记以改变搜索栏排版
    searchWords: "",
    swiperContent: ["green", "blue", "violet", "orange"], //感觉正常情况幻灯片参数内容应该是背景图片和对应的商品id
    tags: ["所有", "电子产品", "书籍", "书籍", "其它"],
    selectedIndex: -1,
    isSortByTime: true, //排列方式
    postList: []
  },
  methods: {
    // 搜索框变化
    searchBarFocus() {
      this.setData({
        serachBarFoucus: true
      })
    },
    searchBarBlur() {
      if (!this.data.searchWords.length)
        this.setData({
          serachBarFoucus: false
        })
    },
    // 选择标签
    chooseTag(e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        selectedIndex: index
      })
    },
    navigateToWritePage() {
      wx.navigateTo({
        url: '/pages/index/newItem/newItem',
      })
    },
    async getPostsList() {
      if (isGettingList) return
      isGettingList = true
      try {
        const res = await getPostsList({
          mode: "Time",
          limit: 20,
          offset: 0
        })
        console.log(res.data)
        isGettingList = false;
        res.data.map((item) => {
          item.CreatedAt = correctTime(item.CreatedAt)
        })
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
  },
  pageLifetimes: {
    show() {
      startId = 0
      this.getPostsList()
    }
  },
})