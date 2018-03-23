//index.js
//获取应用实例
const app = getApp()
var interval = null //倒计时函数
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; // 验证手机号码
Page({
  data: {
    userName: '',
    phone: '',
    authCode: '',
    numbera: '63832',
    fun_id: 2,
    text: '获取验证码',
    currentTime: 61,
    condition: true,
    condition2: false
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        text: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          text: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  // 发送验证码
  getVerificationCode() {
    var phone = this.data.phone;
    if (phone == '') {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      })
      return
    }
    if (!myreg.test(phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false
      })
      return
    }
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 1000
    })
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  // 获取用户输入的姓名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取用户输入的手机号码
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取用户输入的验证码
  authCodeInput: function (e) {
    this.setData({
      authCode: e.detail.value
    })
  },
  // 焦点离开，验证手机号码
  checkphone: function (e) {
    var phone= this.data.phone;
    if (phone == ''){
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      }) 
    } else if (!myreg.test(phone)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        showCancel: false
      }) 
    }
    },
    // 提交
  submit: function (e) {
    var userName = this.data.userName;
    var phone = this.data.phone;
    var authCode = this.data.authCode;
    var _this = this;
    if (userName == '') {
      wx.showModal({
        title: '提示',
        content: '请输入您的姓名',
        showCancel: false
      })
      return
    }
     if (phone == '') {
       wx.showModal({
         title: '提示',
         content: '请输入手机号码',
         showCancel: false
       })
      return
    } 
     if (!myreg.test(phone)) {
       wx.showModal({
         title: '提示',
         content: '手机号码有误',
         showCancel: false
       })
       return
    }
     if (authCode == '') {
       wx.showModal({
         title: '提示',
         content: '请输入验证码',
         showCancel: false
       })
      return
    }
     wx.showModal({
       title: '提示',
       content: '已提交',
       showCancel: false,
       success: function () {
         _this.setData({
           condition: false,
           condition2: true
         })  
       }
     })
  },
  // 返回
  getBack: function () {
    this.setData({
      condition: true,
      condition2: false,
      userName: '',
      phone: '',
      authCode: '',
    })  
  }
})
