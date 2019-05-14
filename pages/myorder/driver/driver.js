// pages/myorder/driver/driver.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'delivery/GetDeliveryInfo',
      data: {
        orderId: options.orderid
      },
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          user:res.data.data.sysUserEntit0y
        })
        if(res.data.data.logisticsType=='备货中'){
          that.setData({
            state:1
          })
        }
        else if(res.data.data.logisticsType=='配送中'){
          that.setData({
            state:2
          })
        }
        else if(res.data.data.logisticsType=='已完成'){
          that.setData({
            state:3
          })
        }
      }
    })
  },
  tell(){
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.data.user.mobile
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