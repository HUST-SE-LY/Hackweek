const App = getApp()
import {
  uploadAvatar,
  editUserInfo
} from '../../utils/request'
Page({
  data: {
    avatar: "",
    userName: "小明",
    qq: "null",
    wx: "null"
  },
  onShow: function () {
    this.loadInfo()
  },
  // 下面有一次复用，所以写成了函数
  loadInfo() {
    const {
      avatar,
      userName,
      qq,
      wx
    } = App.globalData.userInfo
    this.setData({
      avatar,
      userName,
      qq,
      wx
    })
  },
  navigateToEditName() {
    wx.navigateTo({
      url: '/pages/editInfo/editName/editName',
    })
  },
  navigateToEditQQ() {
    wx.navigateTo({
      url: '/pages/editInfo/editqq/editqq',
    })
  },
  navigateToEditWx() {
    wx.navigateTo({
      url: '/pages/editInfo/editwx/editwx',
    })
  },
  showModal() {
    wx.showModal({
      title: "确定退出？",
      confirmColor: "black",
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('token', ""),
            App.globalData.userInfo = {
              travelMode: true,
              avatar: "/static/my.png",
              userName: "未登录",
              qq: "未设置",
              wx: "未设置",
            }
          wx.navigateTo({
            url: '../index/index',
          })
        } else if (res.cancel) {

        }

      }
    })
  },
  chooseAvatar() {
    let that = this;
    wx.chooseMedia({
      mediaType: 'image',
      count: 1,
      success: async (res) => {
        that.setData({
          avatar: res.tempFiles[0].tempFilePath,
        });
        console.log(that.data.avatar)
        const avatar = await uploadAvatar({
          filePath: res.tempFiles[0].tempFilePath,
          userid: App.globalData.userInfo.userid
        })
        console.log({
          fileid: avatar
        })
        editUserInfo({
          fileid: avatar.fileID
        })
      }
    })
  }
})