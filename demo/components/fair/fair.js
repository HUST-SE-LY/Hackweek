import {
  correctTime
} from "../../utils/util";
import {
  getPostsList,
  searchByTag,
  searchByTitle,
} from '../../utils/request'
const app = getApp();
let startId = 0; //请求起始标号
let startIdTitle = 0;
let startIdTag = 0;
let isGettingList = false; //限流
let isSearchingByTitle = false; //限流
let isSearchingByTag = false; //限流
Component({
  data: {
    isSearchBarFoucus: false, //用于标记以改变搜索栏排版
    searchWords: "",
    swiperContent: ["cloud://prod-7gigvlg43eb566e9.7072-prod-7gigvlg43eb566e9-1313093695/postImg/1665590208097", "cloud://prod-7gigvlg43eb566e9.7072-prod-7gigvlg43eb566e9-1313093695/postImg/1665590209959", "cloud://prod-7gigvlg43eb566e9.7072-prod-7gigvlg43eb566e9-1313093695/postImg/1665590210480", "cloud://prod-7gigvlg43eb566e9.7072-prod-7gigvlg43eb566e9-1313093695/postImg/1665590211822"], //感觉正常情况幻灯片参数内容应该是背景图片和对应的商品id
    tags: ["电子产品", "文具书籍", "生活用品", "服饰衣物", "其他"],
    selectedIndex: -1,
    isSortByTime: true, //排列方式
    postList: [],
    serachHistory: ["暂无搜索记录"],
    tagImage: ['../../static/phone.svg', "../../static/book.svg", '../../static/daily.svg', '../../static/clothes.svg', '../../static/other.svg', '../../static/phone1.svg', '../../static/book1.svg', '../../static/daily1.svg', '../../static/clothes1.svg', '../../static/other1.svg'],
    isLoading: false,
    noPost: false,
  },
  methods: {
    // 搜索框变化
    searchBarFocus() {
      const serachHistory = wx.getStorageSync('serachHistory')
      if (serachHistory && serachHistory.length) this.setData({
        serachHistory
      })
      this.setData({
        isSearchBarFoucus: true
      })
    },
    //搜索历史相关
    closeSearchHistory() {
      this.setData({
        isSearchBarFoucus: false
      })
    },
    clearHistory() {
      this.setData({
        serachHistory: ["暂无搜索记录"]
      })
      wx.setStorageSync('serachHistory', [])
    },
    chooseSearchHistory(e) {
      if (e.currentTarget.dataset.content === "暂无搜索记录") {
        return;
      }
      this.setData({
        searchWords: e.currentTarget.dataset.content
      })
    },
    saveSearchHistory() {
      let serachHistory = wx.getStorageSync('serachHistory')
      console.log(serachHistory)
      if (!serachHistory) serachHistory = []
      //仅保存5条
      if (serachHistory.length == 5) {
        serachHistory.pop()
      }
      serachHistory.unshift(this.data.searchWords)
      wx.setStorageSync('serachHistory', serachHistory)
      this.setData({
        serachHistory
      })
    },
    // 选择标签
    chooseTag(e) {
      startIdTag = 0;
      this.setData({
        postList: []
      })
      const index = e.currentTarget.dataset.index
      if (this.data.selectedIndex === index) {
        startId = 0;
        this.setData({
          selectedIndex: -1
        });
        this.getPostsList()
        return 1;
      }
      this.setData({
        selectedIndex: index
      });
      this.selectByTag();

    },
    bottomFresh() {
      if (this.data.selectedIndex >= 0) {
        this.selectByTag();
      } else if (this.data.searchWords !== "") {
        this.selectByTitle();
      } else {
        console.log(startId)
        this.getPostsList();
      }
    },
    getPostsByTime() {
      this.setData({
        postList: [],
        isSortByTime: true
      });
      startId = 0;
      startIdTag = 0;
      startIdTitle = 0;
      if (this.data.selectedIndex >= 0) {
        console.log("tagggg")
        this.selectByTag();
      } else if (this.data.searchWords !== "") {
        this.selectByTitle();
      } else {
        this.getPostsList();
      }
    },
    getPostsByHot() {
      this.setData({
        postList: [],
        isSortByTime: false
      });
      startId = 0;
      startIdTag = 0;
      startIdTitle = 0;
      if (this.data.selectedIndex >= 0) {
        this.selectByTag();
      } else if (this.data.searchWords !== '') {
        this.selectByTitle();
      } else {
        this.getPostsList();
      }
    },
    searchTitle() {
      startIdTitle = 0;
      if (app.globalData.userInfo.travelMode) {
        wx.reLaunch({
          url: '../../pages/login/login',
        })
      } else {
        this.selectByTitle();
      }

    },
    async selectByTag() {
      if (isSearchingByTag) {
        return isSearchingByTag = true;
      }
      try {
        this.setData({
          isLoading: true,
          noPost: false
        })
        const res = await searchByTag({
          mode: this.data.isSortByTime ? "Time" : "Hot",
          limit: 20,
          offset: startIdTag,
          tag: this.data.tags[this.data.selectedIndex],
        })
        this.setData({
          isLoading: false
        })
        console.log(res.data);
        isSearchingByTag = false;
        res.data.map((item) => {
          item.CreatedAt = correctTime(item.CreatedAt);
          if (item.Fileid == "") item.Fileid = []
          else item.Fileid = item.Fileid.split(",")
        })
        if (startIdTag === 0) {
          this.setData({
            postList: res.data
          })
        } else {
          this.setData({
            postList: this.data.postList.concat(res.data)
          })
        }
        if (this.data.postList.length === 0) {
          this.setData({
            noPost: true
          })
        }
        startIdTag += res.data.length;
        isSearchingByTag = false;
      } catch (err) {
        console.log(err);
        isSearchingByTitle = false;
      }
    },
    async selectByTitle() {
      if (!this.data.searchWords.length) return
      if (isSearchingByTitle) {
        return isSearchingByTitle = true;
      }
      try {
        this.setData({
          isLoading: true,
          noPost: false
          postList: []
        })
        const res = await searchByTitle({
          mode: this.data.isSortByTime ? "Time" : "Hot",
          limit: 20,
          offset: startIdTitle,
          title: this.data.searchWords
        })
        this.setData({
          isLoading: false
        })
        //保存搜索记录
        this.saveSearchHistory()
        isSearchingByTitle = false;
        res.data.map((item) => {
          item.CreatedAt = correctTime(item.CreatedAt)
          if (item.Fileid == "") item.Fileid = []
          else item.Fileid = item.Fileid.split(",")
        })
        if (startIdTitle === 0) {
          this.setData({
            postList: res.data
          });
        } else {
          this.setData({
            postList: this.data.postList.concat(res.data)
          })
        }
        if (this.data.postList.length === 0) {
          this.setData({
            noPost: true
          })
        }
        startIdTitle += res.data.length
        isSearchingByTitle = false
      } catch (err) {
        console.log(err);
        isSearchingByTitle = false;
      }
    },
    async getPostsList() {
      if (isGettingList) return
      isGettingList = true
      try {
        this.setData({
          isLoading: true,
          noPost: false,
        })
        const res = await getPostsList({
          mode: this.data.isSortByTime ? "Time" : "Hot",
          limit: 20,
          offset: startId,
        })
        this.setData({
          isLoading: false
        })
        isGettingList = false;
        res.data.map((item) => {
          item.CreatedAt = correctTime(item.CreatedAt)
          if (item.Fileid == "") item.Fileid = []
          else item.Fileid = item.Fileid.split(",")
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
        if (this.data.postList.length === 0) {
          this.setData({
            noPost: true
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
      this.setData({
        postList: []
      })
      startId = 0;
      startIdTag = 0;
      startIdTitle = 0;
      if (this.data.selectedIndex >= 0) {
        this.selectByTag();
      } else if (this.data.searchWords !== "") {
        this.selectByTitle();
      } else {
        console.log(startId)
        this.getPostsList();
      }
    }
  },

})