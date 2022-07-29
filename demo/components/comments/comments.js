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
            id:"1",
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
          },

        ]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {

    }
  }
})
