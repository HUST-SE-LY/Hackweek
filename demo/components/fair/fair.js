import {
  correctTime
} from "../../utils/util";
import {
  getPostsList,
  searchByTag,
  searchByTitle,
} from '../../utils/request'
const app=getApp();
let startId = 0; //请求起始标号
let startIdTitle = 0;
let startIdTag = 0;
let isGettingList = false; //限流
let isSearchingByTitle=false;//限流
let isSearchingByTag=false;//限流
Component({
  data: {
    serachBarFoucus: false, //用于标记以改变搜索栏排版
    searchWords: "",
    swiperContent: ["green", "blue", "violet", "orange"], //感觉正常情况幻灯片参数内容应该是背景图片和对应的商品id
    tags: ["电子产品", "文具书籍", "生活用品", "服饰衣物", "其它"],
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
      startIdTag=0;
      const index = e.currentTarget.dataset.index
      if(this.data.selectedIndex===index) {
        startId=0;
        this.setData({selectedIndex:-1});
        this.getPostsList()
        return 1;
      }
      this.setData({
        selectedIndex: index
      });
      this.selectByTag();

    },
    navigateToWritePage() {
      wx.navigateTo({
        url: '/pages/index/newItem/newItem',
      })
    },
    getPostsByTime() {
      this.setData({isSortByTime:true});
      startId=0;
      this.getPostsList();
    },
    getPostsByHot() {
      this.setData({isSortByTime:false});
      startId=0;
      this.getPostsList();
    },
    searchTitle() {
      startIdTitle=0;
      if(app.globalData.userInfo.travelMode) {
        wx.navigateTo({
          url: '../../pages/login/login',
        })
      } else {
        this.selectByTitle();
      }
      
    },
    async selectByTag() {
      if(isSearchingByTag) {
        return isSearchingByTag=true;
      }
      try {
        const res=await searchByTag({
          mode: this.data.isSortByTime?"Time":"Hot",
          limit: 20,
          offset: startIdTag,
          tag : this.data.tags[this.data.selectedIndex],
        })
        console.log(res.data);
        isSearchingByTag=false;
        res.data.map((item)=>{
          item.CreatedAt=correctTime(item.CreatedAt);
        })
        if(startIdTag===0) {
          this.setData({postList:res.data})
        } else {
          this.setData({postList:this.data.postList.concat(res.data)})
        }
        startIdTag+=res.data.length;
        isSearchingByTag=false;
      } catch(err) {
        console.log(err);
        isSearchingByTitle=false;
      }
    },
    async selectByTitle() {
      if(isSearchingByTitle) {
        return isSearchingByTitle = true;
      }
      try {
        const res=await searchByTitle({
          mode: this.data.isSortByTime?"Time":"Hot",
          limit: 20,
          offset: startId,
          title : this.data.searchWords
        })
        console.log(res.data);
        isSearchingByTitle=false;
        res.data.map((item) => {
          item.CreatedAt = correctTime(item.CreatedAt)
        })
        if(startIdTitle===0) {
          this.setData({postList:res.data});
        } else {
          this.setData({
            postList: this.data.postList.concat(res.data)
          })
        }
        startIdTitle += res.data.length
        isSearchingByTitle = false
      } catch(err) {
        console.log(err);
        isSearchingByTitle=false;
      }
    },
    async getPostsList() {
      if (isGettingList) return
      isGettingList = true
      try {
        const res = await getPostsList({
          mode: this.data.isSortByTime?"Time":"Hot",
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