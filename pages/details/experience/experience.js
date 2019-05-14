// pages/details/experience/experience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://h5.hyweb.com.cn/yuanben/details/lb3.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb3.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb3.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb3.png',
      'http://h5.hyweb.com.cn/yuanben/details/lb3.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 支付
    reply: false,
    paytype:0,
  },
  onetype:function(){
    this.setData({
      paytype:1
    })
  },
  twotype:function(){
    this.setData({
      paytype:0
    })
  },
  payexit:function(){
    this.setData({
      reply:!this.data.reply
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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