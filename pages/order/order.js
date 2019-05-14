// pages/order/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscount: '',
    reply: false,
    paytype: 1,
    address: '',
    items: '',
    payment: '',
    list: '',
    password: '',
    slf: false,
    passwidow: false,
    length: 6,
    focus: true,
  },
  onetype: function () {
    this.setData({
      paytype: 0
    })
  },
  twotype: function () {
    this.setData({
      paytype: 1
    })
  },
  payexit: function () {
    this.setData({
      reply: !this.data.reply
    })
  },
  toSuccess1() {
    var that = this
    if (that.data.paytype == 0) {
      that.paywx()
    }
    else if (that.data.paytype == 1) {
      const session = wx.getStorageSync('session')
      wx.request({
        url: app.globalData.url + 'user/getUserInfo',
        method: 'get',
        header: {
          'token': session,
          'content-type': 'application/json'  // 默认值
        },
        success(res) {
          if (res.data.user.password) {
            that.setData({
              passwidow: true
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '您未设置密码，是否去设置',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/owner/password/password'
                  })
                } else if (res.cancel) {
                  wx.showToast({
                    title: '请先设置密码',
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
              fail: function (res) {

              }
            })
          }
        }
      })

    }

  },
  toEdit(e) {
    wx.navigateTo({
      url: '/pages/address/edit/edit?addressId=' + e.currentTarget.dataset.addressid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const order = wx.getStorageSync('order')
    console.log(order)
    that.setData({
      iscount: order.isDiscount,
      list: order.list
    })
    that.price()
  },
  price() {
    var that = this
    let list = that.data.list
    let price = 0
    let youhui = that.data.iscount
    console.log(youhui)
    for (let i = 0; i < list.length; i++) {
      if (youhui == 0) {
        price = price + list[i].sku.memberPrice * list[i].goodsSize
      }
      else {
        price = price + list[i].sku.preferentialPrice * list[i].goodsSize
      }
    }
    that.setData({
      payment: price
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
  // 余额支付
  payyue() {
    var that = this;
    const session = wx.getStorageSync('session')
    let list = that.data.list
    let form = {}
    let items = []
    let youhui = that.data.iscount
    for (let i = 0; i < list.length; i++) {
      let good = {}
      good.goodsId = list[i].goodsId
      good.goodsNum = list[i].goodsSize
      if (youhui == 0) {
        good.price = list[i].sku.memberPrice
      }
      else {
        good.price = list[i].sku.preferentialPrice
      }
      good.goodsSku = list[i].skuId
      items.push(good)
    }
    form.address = Number(that.data.address.deliveryAddressId)
    form.patternPayment = Number(that.data.paytype)
    form.payment = Number(that.data.payment)
    form.items = items
    let item = JSON.stringify(form)
    wx.request({
      url: app.globalData.url + 'order/pay',
      data: item,
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.setStorageSync('pay', res.data.order)
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/paysuccess/paysuccess1/paysuccess1'
            })
          }, 1200)
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

  // 微信支付
  paywx() {
    var that = this;
    const session = wx.getStorageSync('session')
    let list = that.data.list
    let form = {}
    let items = []
    let youhui = that.data.iscount
    for (let i = 0; i < list.length; i++) {
      let good = {}
      good.goodsId = list[i].goodsId
      good.goodsNum = list[i].goodsSize
      if (youhui == 0) {
        good.price = list[i].sku.memberPrice
      }
      else {
        good.price = list[i].sku.preferentialPrice
      }
      good.goodsSku = list[i].skuId
      items.push(good)
    }
    form.patternPayment = Number(that.data.paytype)
    form.payment = Number(that.data.payment)
    let item = JSON.stringify(form)
    wx.request({
      url: app.globalData.url + 'order/pay',
      data: item,
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          let orderNum = res.data.orderNum
          wx.requestPayment({
            timeStamp: String(res.data.data.timeStamp),
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.sign,
            success(res) {
              console.log(res)
              form.address = Number(that.data.address.deliveryAddressId)
              form.items = items
              form.orderNum = orderNum
              item = JSON.stringify(form)
              wx.request({
                url: app.globalData.url + 'order/PaySuccess',
                data: item,
                method: 'post',
                header: {
                  'token': session,
                  'content-type': 'application/json'
                },
                success(res) {
                  console.log(res)
                  if (res.data.code == 0) {
                    wx.setStorageSync('pay', res.data.order)
                    setTimeout(() => {
                      wx.navigateTo({
                        url: '/pages/paysuccess/paysuccess1/paysuccess1'
                      })
                    }, 1200)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'getUserAddressByUse',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.address) {
          that.setData({
            address: res.data.address,
          })
        }
        else if (res.data.address == null) {
          wx.showModal({
            title: '提示',
            content: '您未设置地址',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/address/manage/managa'
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
              }
            },
            fail: function (res) {

            }
          })

        }
      }
    })
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