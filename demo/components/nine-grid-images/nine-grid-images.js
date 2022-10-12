// components/nine-grid-images.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images: {
      value: [],
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgLarge(e) {
      let content = e.currentTarget.dataset.url
      this.setData({
        imgLargeUrl: content,
      });
      console.log(e)
    },
    imageLargeClose() { //关闭图片放大
      this.setData({
        imgLargeUrl: null,
      }); //点击空白取消放大查看
    },
    null() {
      return
    }
  },
  lifetimes: {}
})