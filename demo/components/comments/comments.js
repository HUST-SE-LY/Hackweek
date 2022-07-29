// components/comments/comments.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      commentsList: {
        type: Array,
        value: [
          {
            id:"0",
            username: "ly",//用户名
            commentContent: "这是一条评论",//评论内容
            commentSecondList:[//二级评论对象数组
              {
                username1:"demo1",//回复者
                username2:"ly",//被回复者
                content:"这是一条回复评论"
              },
              {
                username1:"demo1",
                username2:"ly",
                content:"这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的评论"
              }
            ],
          },
          {
            id:"1",
            username: "ly",
            commentContent: "这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的评论",
            commentSecondList:[],//必须被指定，没有就为空
          },

        ]
      },
  },


  /**
   * 组件的初始数据
   */
  data: {
    index:null,//要进行二级评论的一级评论下标
    name:"",//被回复的用户名
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reply(content) {//一级回复的渲染
        let commentRend={
          username: "ly",//这个应该是获取来的或者全局变量
          commentContent:content,//回复内容
          commentSecondList:[],
        };
        let array=this.properties.commentsList;
        array.push(commentRend);
        this.setData({commentsList:array});
      //这里还有将内容发送到后端
    },
    replyOthers(e) {//点击用户名后触发显示回复框以及设置index和name
      this.setData({index: e.currentTarget.dataset.index,name:e.currentTarget.dataset.name});
      let page=getCurrentPages();
      let nowPage=page[page.length-1];
      nowPage.setData({isfocus:true,isfooter:false,isReplyOthers:true,placeHolderName:this.data.name});
    },
    reply1(content) {//二级评论的渲染
      let commentRend={
        username2:this.data.name,
        username1: "ly",//这个应该是获取来的或者全局变量
        content:content,
      };
      let array=this.properties.commentsList[this.data.index].commentSecondList;
      array.push(commentRend);
      this.setData({[`commentsList[${this.data.index}].commentSecondList`]:array});
      let page=getCurrentPages();
      let nowPage=page[page.length-1];
      nowPage.setData({isfocus:false,isfooter:true,isReplyOthers:false});//隐藏二级评论输入框，显示一级评论输入框
    }
  },
  lifetimes: {
    attached() {
      //这里要写初始化时拉取10条评论
    }
  }
})
