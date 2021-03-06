// pages/buycard/chengwei/chengwei.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply: true,
    paytype: 0,
    list: '',
    id: '',
    price:'',
    password: '',
    slf: false,
    passwidow: false,
    length: 6,
    focus: true,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'packer/listPacker',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        let list = res.data.data
        that.setData({
          list
        })
      }
    })
  },
  // 打开支付栏
  topay(e) {
    var that = this
    that.setData({
      price:e.currentTarget.dataset.price,
      id: e.currentTarget.dataset.id
    })
    this.setData({
      reply: !this.data.reply
    })
  },
  // 支付
  pay() {
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
  // 微信支付
  paywx() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'packer/buyPacker',
      data: {
        packerId:that.data.id,
        payType:1
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
                url: app.globalData.url + 'packer/packerPaySuccess',
                data: {
                  packerId:that.data.id
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
                      duration: 2000,
                      success(){
                        wx.redirectTo({
                          url: '/pages/paysuccess/paysuccess2/paysuccess2'
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
      url: app.globalData.url + 'packer/buyPacker',
      data: {
        packerId:that.data.id,
        payType:0
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
            duration: 2000,
            success(){
              wx.navigateTo({
                url: '/pages/paysuccess/paysuccess2/paysuccess2'
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