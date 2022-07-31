import {
  sendVerifyCode,
  verifyCodeMatch
} from "../../utils/request";
// pages/login/login.js
Page({
  data: {
    email: "", //email框内输入的内容
    keyValue: "", //验证码框内输入的内容
    emailTrue: true, //判断邮箱格式是否正确
    keyTrue: true, //判断验证码格式是否正确
    keyInputShow: false, //验证码框的显示与否
    getKeyShow: true, //获取验证码按钮的显示与否
    timeIntervalShow: false, //60s间隔按钮的显示与否
    loginShow: false, //登录按钮显示与否
    time: 60, //60s间隔按钮的剩余时间
    firstEmail: "", //用户第一次(获取验证码)的email
    secondEmail: "", //用户第二次(点击登录按钮)的email
  },
  async getKey() { //点击获取验证码按钮时触发

    let that=this
    if (this.data.email && this.data.email.match(/(^[A-z])[0-9]{9,9}((@hust.edu.cn)$)/)) { //判断格式是否正确
      this.setData({
        firstEmail: this.data.email,
        emailTrue: true,
      }) //设置firstEmail;
      try {
        await sendVerifyCode({
          email: this.data.email,
        })
        that.setData({
          emailTrue: true,
          keyInputShow: true, //出现验证码输入框
          timeIntervalShow: true, //出现60s间隔按钮
          getKeyShow: false, //隐藏获取验证码按钮
        });
        let i = 60;
        let interval = setInterval(() => {
          that.setData({
            time: i
          }); //设置60间隔按钮内容
          i--;
          if (i === 0) { //60s结束时
            that.setData({
              timeIntervalShow: false, //60s按钮隐藏
              getKeyShow: true, //获取验证码按钮出现
            })
            clearInterval(interval);
          }
        }, 1000)
      } catch (res) {

      }
    } else {
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
    let that=this;
    this.setData({
      secondEmail: this.data.email
    });
    if (this.data.firstEmail == this.data.secondEmail) { //判断两次输入的邮箱是否为同一个
      const res = await verifyCodeMatch({
        email: that.data.secondEmail,
        code: that.data.keyValue,
      })
      console.log(res)
      wx.setStorageSync('token', res.data)
      wx.redirectTo({
        url: `../index/index`, //登陆成功跳转到index（暂定），以及传入res中需要的数据（后端完成后再说）
      })
    }
  }
})
