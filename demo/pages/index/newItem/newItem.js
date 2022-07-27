// pages/index/newItem/newItem.js
import {
  releaseNewItem,
} from "../../../utils/request.js";
Page({

  data: {
    title:"",//帖子标题
    detail:"出：品牌/新旧/入手渠道/转手原因\n收：需求/其他说明",//帖子正文（模拟placeHolder内容）
    detailInput:false,//判断正文是否输入(用于模拟placeHolder内容和提交)
    tag:"选择标签",//商品标签
    tagList:["tag1","tag2","tag3","tag4","tag5"],//商品标签列表
    locationList:["主校区","同济医学院校区","网安基地校区"],//校区标签列表
    location:"选择校区",//校区
    isChooseTag:false,//判断是否选择了tag
    isChooseLocation:false,//判断是否选择了校区
    imageList:[],//存放本地图片url用于预览
    imgLargeUrl:null,//放大后的图片url
    price:"",//期望价格
    canUpload:false,//判断条件是否填写完必要
  },
  clearContent() {//点击后清除placeholder
    this.setData({detail:this.data.detail.replace("出：品牌/新旧/入手渠道/转手原因\n收：需求/其他说明",""),
      detailInput:true,})
  },
  showPlaceholder() {//清空输入栏后出现placeHolder语句
    if(!this.data.detail.replace("出：品牌/新旧/入手渠道/转手原因\n收：需求/其他说明")) {
      this.setData({detailInput: false,detail:"出：品牌/新旧/入手渠道/转手原因\n收：需求/其他说明"})
    }
  },
  returnIndex() {//点击返回详情页
    wx.redirectTo({
      url: '../index',//可能还有其他配置
    })
  },
  uploadImg() {
    let that=this;
    let imgList=this.data.imageList;//获取图片url列表
    if(imgList.length<8) {//图片数小于八才能选择
      wx.chooseImage({
        count: 1,
        success(res) {
          for(let i in res.tempFilePaths) {
            imgList.push(res.tempFilePaths[i]);//存放选择的图片的url
          }
          that.setData({imageList: imgList},)//更新图片列表
        }
      })
    }
  },
  chooseTag() {
    let that=this;
    wx.showActionSheet({
      itemList: this.data.tagList,//展示tag列表
      success(res) {
        if(that.data.location.replace("选择标签").length!==0) {//选择了tag
          that.setData({isChooseTag: true,});
          that.canRelease();
        }
        that.setData({tag: that.data.tagList[res.tapIndex],})//显示出选择的tag
      }
    })
  },
  chooseLocation() {//选择校区函数
    let that=this;
    wx.showActionSheet({
      itemList: this.data.locationList,
      success(res) {
        that.setData({location: that.data.locationList[res.tapIndex],});显示所选校区
        if(that.data.location.replace("选择校区").length!==0) {//确定选择了校区
          that.setData({isChooseLocation: true,});
          that.canRelease();
        }
      }
    })
  },
  imgLarge(url){
    let content=url.currentTarget.dataset.url
    this.setData({imgLargeUrl: content,});//设置放大后的图片url
  },
  imageLargeClose() {
    this.setData({imgLargeUrl: null,});//点击空白取消放大查看
  },
  deleteImage(index) {//删除图片（暂时使用预览小图右上角灰色方块表示）
    let id=index.currentTarget.dataset.index;
    let list=this.data.imageList;
    list.splice(id,1);
    this.setData({imageList:list,});//更新图片url
  },
  canRelease() {//判断是否能够发布的函数
    if(this.data.title!==""&&this.data.price!=null) {
      if(this.data.isChooseTag&&this.data.isChooseLocation) {
        this.setData({canUpload: true,})
      }else {
        this.setData({canUpload: false,})
      }
    } else {
      this.setData({canUpload: false,})
    }
  },
  priceCheck() {
    let priceNow=this.data.price.match(/[0-9]{1,6}/g);//对价格栏正则筛选
    this.setData({price:priceNow});
    this.canRelease();
  },
  async releaseItem() {
    let title=this.data.title;
    let detail=this.data.detail.replace("出：品牌/新旧/入手渠道/转手原因\n收：需求/其他说明","");
    let tag=this.data.tag;
    let location=this.data.location;
    let price=this.data.price;
    
  }
})