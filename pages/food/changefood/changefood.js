// pages/food/changefood/changefood.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    orderItemId: '',
    goods: '',
    itemId: '',
  },
  foodchange: function (e) {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'updateGoodsSetMeal',
      data: {
        goodsId: that.data.goodsId,
        replaceId: e.currentTarget.dataset.replaceid,
        orderId: e.currentTarget.dataset.orderid
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
    wx.showToast({
      title: '替换成功',
      icon: 'succes',
      duration: 2000,
      mask: true,
    }),
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      orderItemId:options.mealid,
      goodsId:options.goodsid
    })
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'getReplaceGoods',
      data:{
        orderId:options.mealid,
        goodsId:options.goodsid
      },
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        that.setData({
          goods:res.data.goods
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