Component({
  data: {
    serachBarFoucus: false, //用于标记以改变搜索栏排版
    searchWords: "",
    swiperContent: ["green", "blue", "violet", "orange"], //感觉正常情况幻灯片参数内容应该是背景图片和对应的商品id
    tags: ["所有", "电子产品", "书籍", "书籍", "其它"],
    selectedIndex: -1,
    isSortByTime: true, //排列方式
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
    }
  }
})