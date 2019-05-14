// pages/siji/examine/examine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    page: 1,
    wait: '',
    yichang: '',
    finish: ''
  },
  // 改变头部
  changetype: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  // 改变底部
  changepage: function (e) {
    this.setData({
      page: e.currentTarget.dataset.page
    })
  },
  // 扫码
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        
      }
    })
  },
  // 订单详情
  toDetail(e){
    wx.navigateTo({
      url: '/pages/siji/detail/detail?deliveryid='+e.currentTarget.dataset.deliveryid+'&orderid='+e.currentTarget.dataset.orderid
    })
  },
  // 加载页面
  load() {
    var that = this
    const session = wx.getStorageSync('siji')
    wx.request({
      url: app.globalData.delivery + 'getOrderByDelivery',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        let list = res.data.data
        let wait = []
        let yichang = []
        let finish = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].logisticsType == '配送中') {
            wait.push(list[i])
          }
          else {
            if (list[i].deliveryStatus == '正常订单') {
              finish.push(list[i])
            }
            else if (list[i].deliveryStatus == '异常订单') {
              yichang.push(list[i])
            }
          }
        }
        that.setData({
          wait,
          yichang,
          finish,
        })
      }
    })
    
  },
  // 核销记录
  toWrite() {
    wx.navigateTo({
      url: '/pages/siji/write/write'
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
    var that = this
    that.load()
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