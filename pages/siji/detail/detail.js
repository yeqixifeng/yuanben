// pages/siji/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    list: '',
    list1: ''
  },
  finish() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否已回收箱子',
      confirmText: '已回收',
      cancelText: '未回收',
      cancelColor: '#7DA647',
      success: function (res) {
        if (res.confirm) {
          let item = that.data.item
          item.logisticsType = 1
          item.deliveryStatus = 0
          item.isRecyclingBox = 0
          delete item.packerType
          delete item.deliveryAddressForm
          delete item.lifeMealGoodsEntity
          delete item.lifeGoodsEntity
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
                  delta: 1
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
        } else if (res.cancel) {
          let item = that.data.item
          item.logisticsType = 1
          item.deliveryStatus = 1
          item.isRecyclingBox = 1
          delete item.packerType
          delete item.deliveryAddressForm
          delete item.lifeMealGoodsEntity
          delete item.lifeGoodsEntity
          item.remake = '箱子未回收'
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
                  delta: 1
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
        }
      },
      fail: function (res) {

      }
    })
  },
  toYichang(){
    var that=this
    let a=that.data.item
    wx.navigateTo({
      url: '/pages/siji/yichang/yichang?deliveryid='+a.deliveryId+'&orderid='+a.orderId
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
        let list = res.data.data.lifeMealGoodsEntity
        let list1 = res.data.data.lifeGoodsEntity
        that.setData({
          item,
          list,
          list1
        })
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