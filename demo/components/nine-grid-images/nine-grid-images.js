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
    container_mode:"zero",
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
    },
    fresh() {
      this.setData({
        images:this.properties.images,
      })
      switch(this.data.images.length) {
        case 0:
          break;
        case 1:
          this.setData({
            container_mode:"one"
          })
          break;
        case 2:
          this.setData({
            container_mode:"two"
          })
          break;
        case 3:
          this.setData({
            container_mode:"three"
          })
          break;
        case 4:
          this.setData({
            container_mode:"four"
          })
          break; 
        case 5:
          this.setData({
            container_mode:"five"
          })
          break;
        case 6:
          this.setData({
            container_mode:"six"
          })
          break;    
        case 7:
          this.setData({
            container_mode:"seven"
          })
          break;
        case 8:
          this.setData({
            container_mode:"eight"
          })
          break;
        case 9:
          this.setData({
            container_mode:"nine"
          })
          break;
      }
    }
  },
  lifetimes: {
    attached() {
      this.fresh()
    }
  }
})