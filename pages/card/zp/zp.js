// pages/card/zp/zp.js
var app=getApp()
var QRCode = require('../../../utils/weapp-qrcode.js');
var qrcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reply:false,
    grade:1,
    list:'',
    card:'',
  },
  isopen:function(e){
    this.setData({
      reply:!this.data.reply,
      card:e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url+'user/voucher', 
      data:{
        type:3
      },
      method:'get',
      header: {
        'token':session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data)
        let list=res.data.vouchers
        that.setData({
          list:list
        })
      }
    })
    qrcode = new QRCode('canvas', {
      text: "code=0000000000000",
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  tapHandler: function (e) {
    qrcode.makeCode(e.currentTarget.dataset.code);  //用元素对应的code更新二维码
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