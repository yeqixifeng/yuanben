// pages/owner/report/report.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ''
  },
  toArtical(e) {
    wx.navigateTo({
      url: '/pages/owner/artical/artical?article='+e.currentTarget.dataset.article
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
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/getCrticle',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        that.setData({
          list: res.data.data
        })
        let list=that.data.list
        for(let i=0;i<list.length;i++){
          let description=list[i].content
          description = description.replace(/(\n)/g, "");
          description = description.replace(/(\t)/g, "");
          description = description.replace(/(\r)/g, "");
          description = description.replace(/<\/?[^>]*>/g, "");
          description = description.replace(/\s*/g, "");
          list[i].content=description
        }
        that.setData({
          list
        })
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