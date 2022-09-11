const App=getApp();
// components/comments/comments.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      
  },


  /**
   * 组件的初始数据
   */
  data: {
    commentsList:[],
    id:"",
    name:"",
    index:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reply(content) {//一级回复的渲染
        let commentRend={
          UserName: App.globalData.userInfo.userName,//用户名
          Content:content,//回复内容
          commentSecondList:[],
        };
        let array=this.properties.commentsList;
        array.push(commentRend);
        this.setData({commentsList:array});
    },
    replyOthers(e) {//点击用户名后触发显示回复框以及设置index和name
      console.log(e.currentTarget.dataset)
      this.setData({
        id: e.currentTarget.dataset.id,
        name:e.currentTarget.dataset.name,
        index:e.currentTarget.dataset.index,
      });
      let page=getCurrentPages();
      let nowPage=page[page.length-1];
      nowPage.setData({
        isfocus:true,
        isfooter:false,
        isReplyOthers:true,
        placeHolderName:this.data.name,
        responseid:e.currentTarget.dataset.id,
      });
    },
    reply1(content) {//二级评论的渲染
      let commentRend={
        Content:content,
        UserName:App.globalData.userInfo.userName,
      };
      console.log(content)
      let array=this.properties.commentsList[this.data.index].ReplyComments;
      array.push(commentRend);
      this.setData({[`commentsList[${this.data.index}].ReplyComments`]:array});
      let page=getCurrentPages();
      let nowPage=page[page.length-1];
      nowPage.setData({isfocus:false,isfooter:true,isReplyOthers:false});//隐藏二级评论输入框，显示一级评论输入框
    },
  },
  lifetimes: {
    attached() {
      //这里要写初始化时拉取10条评论
    }
  }
})
