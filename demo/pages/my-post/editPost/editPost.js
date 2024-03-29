import {
  editMyPost,
  deleteMyPost,
  updateImg,
} from "../../../utils/request.js";
import {
  showToast
} from "../../../utils/wx-event.js"
const app = getApp();
let deleteImageIdx = []

Page({
  data: {
    title: "", //帖子标题
    detail: "", //帖子正文（模拟placeHolder内容）
    detailInput: false, //判断正文是否输入(用于模拟placeHolder内容和提交)
    tag: "选择标签", //商品标签
    tagList: ["电子产品", "文具书籍", "生活用品", "服饰衣物", "其他"], //商品标签列表
    locationList: ["主校区", "同济医学院校区", "网安基地校区"], //校区标签列表
    location: "选择校区", //校区
    isChooseTag: true, //判断是否选择了tag
    isChooseLocation: true, //判断是否选择了校区
    imageList: [], //存放本地图片url用于预览
    imgLargeUrl: null, //放大后的图片url
    price: "", //期望价格
    canUpload: false, //判断条件是否填写完必要
    qq: app.globalData.userInfo.qq,
    wx: app.globalData.userInfo.wx,
  },
  onLoad(options) {
    let imageList = options.fileid
    if (!imageList) imageList = []
    else imageList = imageList.split(",")
    this.setData({
      title: options.title,
      detail: options.content,
      tag: options.tag,
      location: options.location,
      price: options.price,
      postid: options.id,
      originListLength: imageList.length,
      imageList: imageList,
      wx: app.globalData.userInfo.wx,
      qq: app.globalData.userInfo.qq,
    })
  },
  clearContent() { //点击后清除placeholder
    this.setData({
      detailInput: true,
    })
  },
  showPlaceholder() { //清空输入栏后出现placeHolder语句
    //其实可以
    this.setData({
      detailInput: false,
    })
  },
  uploadImg() {
    let that = this;
    let imgList = this.data.imageList; //获取图片url列表
    if (imgList.length < 9) { //图片数小于八才能选择
      wx.chooseImage({
        count: 9 - imgList.length,
        success(res) {
          for (let i in res.tempFilePaths) {
            imgList.push(res.tempFilePaths[i]); //存放选择的图片的url
          }
          that.setData({
            imageList: imgList
          }, ) //更新图片列表
        }
      })
    }
  },
  chooseTag() {
    let that = this;
    wx.showActionSheet({
      itemList: this.data.tagList, //展示tag列表
      success(res) {
        if (that.data.location.replace("选择标签").length !== 0) { //选择了tag
          that.setData({
            isChooseTag: true,
          });
        }
        that.setData({
          tag: that.data.tagList[res.tapIndex],
        }) //显示出选择的tag
      }
    })
  },
  chooseLocation() { //选择校区函数
    let that = this;
    wx.showActionSheet({
      itemList: this.data.locationList,
      success(res) {
        that.setData({
          location: that.data.locationList[res.tapIndex],
        }); //显示所选校区
        console.log(that.data.location)
        if (that.data.location.replace("选择校区").length !== 0) { //确定选择了校区
          that.setData({
            isChooseLocation: true,
          });
        }
      }
    })
  },
  imgLarge(url) {
    let content = url.currentTarget.dataset.url
    this.setData({
      imgLargeUrl: content,
    }); //设置放大后的图片url
  },
  imageLargeClose() {
    this.setData({
      imgLargeUrl: null,
    }); //点击空白取消放大查看
  },
  deleteImage(index) { //删除图片（暂时使用预览小图右上角灰色方块表示）
    let id = index.currentTarget.dataset.index;
    let list = this.data.imageList;
    list.splice(id, 1);
    deleteImageIdx.push(id)
    this.setData({
      imageList: list,
    }); //更新图片url
  },
  canRelease() { //判断是否能够发布的函数
    if (!this.data.title.length) {
      showToast("请填写标题")
      return false
    }
    if (!this.data.detail.length) {
      showToast("请填写帖子内容")
      return false
    }
    if (!this.data.isChooseTag) {
      showToast("请选择标签")
      return false
    }
    if (!this.data.isChooseLocation) {
      showToast("请选择校区")
      return false
    }
    if (!this.data.price) {
      showToast("请填写期望售价")
      return false
    }
    if (!(this.data.qq.length || this.data.wx.length)) {
      showToast("请至少完善一种联系方式")
      return false
    }
    return true
  },
  priceCheck() {
    //已废弃
  },
  async deletePost() {
    const postid = this.data.postid;
    wx.showModal({
      title: '确认删除？',
      success(res) {
        if (res.confirm) {
          const res = deleteMyPost({
            postid: postid
          });
          wx.navigateBack({
            delta: 0,
          })
        }
      }
    });
  },

  releaseItem() {
    if (!this.canRelease()) return
    this.releaseNewItem();
    wx.navigateBack({
      delta: 0,
    });
  },
  async releaseNewItem() {
    if (app.globalData.userInfo.wx === "" && app.globalData.userInfo.qq === "") { //完善联系方式才能发帖
      wx.showToast({
        title: '请完善联系方式',
        icon: "none",
        duration: 2000,
      })
    } else {
      let filelist = [];
      for (let i = 0; i < this.data.originListLength; i++) {
        filelist.push(this.data.imageList[i]);
      }
      for (let i = this.data.originListLength; i < this.data.imageList.length; i++) {
        await updateImg({
          filePath: this.data.imageList[i],
          postId: this.data.postid,
        })
      }
      const title = this.data.title;
      const content = this.data.detail;
      const tag = this.data.tag;
      const location = this.data.location;
      const price = this.data.price;
      const avatar = app.globalData.userInfo.avatarId;
      const deleteImageTemp = new Array(9).fill(0)
      for (let i = 0; i < deleteImageTemp.length; i++) {
        let idx = -1
        let n = deleteImageIdx[i]
        while (n >= 0) {
          for (let j = 0; j < deleteImageTemp.length; j++) {
            idx++
            if (deleteImageTemp[j] == 0) {
              n--
              if (n == -1) break
            }
          }
        }
        console.log(deleteImageTemp)
        deleteImageTemp[idx] = 1
      }
      let deleteImage = []
      for (let i = 0; i < deleteImageTemp.length; i++) {
        if (deleteImageTemp[i] === 1) deleteImage.push(i)
      }
      deleteImageIdx = []
      const res = await editMyPost({
        postid: this.data.postid,
        avatar: avatar,
        title: title,
        content: content,
        price: price,
        location: location,
        tag: tag,
        deleteImage
      });
      showToast("修改成功")
    }
  }
})