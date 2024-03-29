import {
  sendVerifyCode,
  verifyCodeMatch
} from "../../utils/request";
// pages/login/login.js
let app = getApp();
let isGettingKey;
Page({
  data: {
    canFresh: false,
    loginPage: true, //判断是否logo是否消失以及登录界面出现
    email: "", //email框内输入的内容
    keyValue: "", //验证码框内输入的内容
    emailTrue: true, //判断邮箱格式是否正确
    keyTrue: true, //判断验证码格式是否正确
    verifyCodeTrue: true,
    keyInputShow: false, //验证码框的显示与否
    getKeyShow: true, //获取验证码按钮的显示与否
    timeIntervalShow: false, //60s间隔按钮的显示与否
    loginShow: false, //登录按钮显示与否
    time: 60, //60s间隔按钮的剩余时间
    firstEmail: "", //用户第一次(获取验证码)的email
    secondEmail: "", //用户第二次(点击登录按钮)的email
    dialogShow: false
  },
  onLoad() {
    wx.loadFontFace({
      family: 'ZoomlaXSongExtraLight',
      source: 'url("https://code.z01.com/font/ZoomlaXSongExtraLight.ttf")',
    })
  },
  travelMode() {
    app.globalData.userInfo.travelMode = true;
    wx.navigateTo({
      url: '../index/index',
    })
  },
  logoOut() {
    this.setData({
      loginPage: true,
    });
  },
  freshPage() {
    this.setData({
      dialogShow: true
    })
  },
  closeDialog() {
    this.setData({
      dialogShow: false
    })
  },
  async getKey() { //点击获取验证码按钮时触发
    if (isGettingKey) {
      return isGettingKey = true;
    }
    isGettingKey = true;
    let that = this
    if (this.data.email && this.data.email.match(/(^[A-z])[0-9]{9,9}/)) { //判断格式是否正确
      this.setData({
        firstEmail: this.data.email,
        emailTrue: true,
        time: 600,
      }) //设置firstEmail;
      try {
        await sendVerifyCode({
          email: this.data.email + "@hust.edu.cn",
        })
        that.setData({
          emailTrue: true,
          keyInputShow: true, //出现验证码输入框
          timeIntervalShow: true, //出现60s间隔按钮
          getKeyShow: false, //隐藏获取验证码按钮
          canFresh: true,
        });
        isGettingKey = false;
        let i = 600;
        i--;
        let interval = setInterval(() => {
          that.setData({
            time: i
          }); //设置60间隔按钮内容
          i--;
          if (i < 0) { //60s结束时
            that.setData({
              timeIntervalShow: false, //60s按钮隐藏
              getKeyShow: true, //获取验证码按钮出现
              keyInputShow: false,
              keyValue: "",
              verifyCodeTrue: true,
              loginShow: false,
              canFresh: false,
            })
            clearInterval(interval);
          }
        }, 1000)
      } catch (res) {

      }
    } else {
      isGettingKey = false;
      this.setData({
        emailTrue: false,
        email: null, //清空输入框
      })
    }
  },
  keyJudge() { //判断验证码格式
    if (this.data.keyValue == "" || this.data.keyValue.length === 6) { //为空或者位数正确
      this.setData({
        keyTrue: true,
      })
    } else {
      this.setData({
        keyTrue: false,
      }) //边框变红
    }
    if (this.data.keyValue.length === 6) { //如果输入了且长度为6
      this.setData({
        loginShow: true,
        timeIntervalShow: false,
      }) //显示登录按钮隐藏其他按钮
    } else {
      this.setData({
        loginShow: false,
        timeIntervalShow: true,
      })
    }
  },
  async login() {
    let that = this;
    this.setData({
      secondEmail: this.data.email
    });
    if (this.data.firstEmail == this.data.secondEmail) { //判断两次输入的邮箱是否为同一个
      try {
        const res = await verifyCodeMatch({
          email: that.data.secondEmail + "@hust.edu.cn",
          code: that.data.keyValue,
        })
        if (res.code == 200) {
          wx.setStorageSync('token', res.data);
          app.globalData.userInfo.travelMode = false;
          wx.redirectTo({
            url: `../index/index`, //登陆成功跳转到index
          })
        }
      } catch (err) {
        this.setData({
          verifyCodeTrue: false,
          keyValue: "",
          loginShow: false,
          timeIntervalShow: true,
        })
      }

    }
  }
})