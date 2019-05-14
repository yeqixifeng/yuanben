// pages/siji/yichang/yichang.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    item: '',
    problem: ''
  },
  changeType(e) {
    var that = this
    that.setData({
      type: e.currentTarget.dataset.type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    const session = wx.getStorageSync('siji')
    wx.request({
      url: app.globalData.delivery + 'getOrderByDelivery',
      method: 'post',
      data: {
        delivery: options.deliveryid,
      },
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        console.log(res)
        let item = res.data.data
        that.setData({
          item,
        })
      }
    })
  },
  problem(e) {
    var that = this
    that.setData({
      problem: e.detail.value
    })
  },
  finish() {
    var that = this
    let item = that.data.item
    item.logisticsType = 1
    item.deliveryStatus = 1
    delete item.packerType
    delete item.deliveryAddressForm
    delete item.lifeMealGoodsEntity
    delete item.lifeGoodsEntity
    if (!that.data.problem == '') {
      item.isRecyclingBox = 0
      item.remake = that.data.problem
    }
    else {
      if (that.data.type == 1) {
        item.isRecyclingBox = 1
        item.remake = '箱子未回收'
      }
      else if (that.data.type == 2) {
        item.isRecyclingBox = 0
        item.remake = '菜品不好被拒'
      }
      else if (that.data.type == 3) {
        item.isRecyclingBox = 0
        item.remake = '客户家里没人'
      }
    }
    let items = JSON.stringify(item)
    const session = wx.getStorageSync('siji')
    wx.request({
      url: app.globalData.delivery + 'CompleteDelivery',
      method: 'post',
      data: items,
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.navigateBack({
            delta: 2
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
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