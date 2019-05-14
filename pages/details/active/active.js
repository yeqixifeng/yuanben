// pages/details/active/active.js
var app = getApp()
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://h5.hyweb.com.cn/yuanben/details/lb1.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb1.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb1.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb1.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb1.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 支付
    reply: false,
    paytype: 0,
    active: '',
    password: '',
    slf: false,
    passwidow: false,
    length: 6,
    focus: true,
    tiyan: ''
  },
  onetype: function () {
    this.setData({
      paytype: 1
    })
  },
  twotype: function () {
    this.setData({
      paytype: 0
    })
  },
  payexit: function () {
    this.setData({
      reply: !this.data.reply
    })
  },
  toLingqu() {
    var that = this
    if (that.data.paytype == 0) {
      that.setData({
        passwidow: true
      })
    }
    else if (that.data.paytype == 1) {
      that.paywx()
    }
  },
  tell() {
    var that = this
    wx.makePhoneCall({
      phoneNumber: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.load()
  },
  load() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'active/getActive',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data.active.showForUpImgs[0].url)
        let img = []
        for (let i = 0; i < res.data.active.showForUpImgs.length; i++) {
          img.push(res.data.active.showForUpImgs[i].url)
        }
        console.log(res.data.active)
        that.setData({
          active: res.data.active,
          imgUrls: img
        }),
          console.log(that.data.active)
        WxParse.wxParse('detiel', 'html', res.data.active.infoImgs, that, 0)

      }
    })
  },
  // 获取体验券码
  tiyan(e) {
    var that = this
    that.setData({
      tiyan: e.detail.value
    })
  },
  // 兑换
  duihuan() {
    var that = this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/UseVoucherByCard',
      data: {
        cardNumber: that.data.tiyan,
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '兑换成功',
            icon: 'none',
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/paysuccess/lingqu/lingqu'
          })
        }
        else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 微信支付
  paywx() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'active/PayActive',
      data: {
        activeId: that.data.active.farmTourismId,
        payType: 1
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.requestPayment({
            timeStamp: String(res.data.data.timeStamp),
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.sign,
            success(res) {
              console.log(res)
              wx.request({
                url: app.globalData.url + 'active/PayActiveSuccess',
                data: {
                  activeId: res.data.active.farmTourismId,
                },
                method: 'post',
                header: {
                  'token': session,
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                  console.log(res)
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '购买成功',
                      icon: 'none',
                      duration: 2000
                    })
                    wx.navigateTo({
                      url: '/pages/paysuccess/lingqu/lingqu'
                    })
                  }
                  else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                },
              })
            },
            fail(res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000
              })
            }
          })

        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
  // 余额支付
  payyue() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'active/PayActive',
      data: {
        activeId: that.data.active.farmTourismId,
        payType: 0
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '购买成功',
            icon: 'none',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/paysuccess/lingqu/lingqu'
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
  // 关闭密码弹窗
  closepass() {
    let passwidow = this.data.passwidow;
    passwidow = false;
    this.setData({ passwidow })
  },
  // 输入密码
  changepass(e) {
    var that = this
    const session = wx.getStorageSync('session')
    let password = e.detail.value;
    that.setData({ password })
    if (password.length == 6) {
      wx.showLoading({
        title: '',
        icon: 'none'
      })
      wx.request({
        url: app.globalData.url + 'user/chkPassword',
        data: {
          password: password
        },
        method: 'post',
        header: {
          'token': session,
          'content-type': 'application/x-www-form-urlencoded'  // 默认值
        },
        success: res => {
          if (res.data.code == 0) {
            that.payyue()
          }
          else if (res.data.code == 500) {
            wx.showToast({
              title: '密码错误',
              icon: 'none',
              duration: 2000,
              success() {
                that.setData({
                  passwidow: false,
                  password: ''
                })
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})