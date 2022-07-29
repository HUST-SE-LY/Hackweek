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
                username1:"demo1",
                username2:"ly",
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
            commentSecondList:[],
          },

        ]
      },
      inputData: {
        type: String,
        observer: (newVal,oldVal)=>{
          
        } 
      }
  },


  /**
   * 组件的初始数据
   */
  data: {
    index:null,
    name:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reply(content) {
        let commentRend={
          username: "ly",//这个应该是获取来的或者全局变量
          commentContent:content,
          commentSecondList:[],
        };
        let array=this.properties.commentsList;
        array.push(commentRend);
        this.setData({commentsList:array});
      
    },
    replyOthers(e) {
      this.setData({index: e.currentTarget.dataset.index,name:e.currentTarget.dataset.name});
      let page=getCurrentPages();
      let nowPage=page[page.length-1];
      nowPage.setData({isfocus:true,isfooter:false,isReplyOthers:true,placeHolderName:this.data.name});
    },
    reply1(content) {
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
      nowPage.setData({isfocus:true,isfooter:true,isReplyOthers:false});
    }
  },
  lifetimes: {
    attached() {
      
    }
  }
})
