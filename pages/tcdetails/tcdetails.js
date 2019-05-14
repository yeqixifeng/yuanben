// pages/tcdetails/tcdetails.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    detiel: '',
    goods:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const session = wx.getStorageSync('session')
    that.setData({
      goodsId:options.foodid
    })
    wx.request({
      url: app.globalData.url + 'getMealGoodsById',
      data:{
        goodsId:options.foodid
      },
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        let goods = res.data.data;
        let banner = [];
        if(goods.upforFile[0]!=null){
          for (let i = 0; i < goods.upforFile.length; i++) {
            banner.push(goods.upforFile[i].url)
          }
        }
        console.log(goods)
        that.setData({
          goods: goods,
          imgUrls: banner,
        })
        WxParse.wxParse('detiel', 'html', goods.detailMap, that, 5)
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