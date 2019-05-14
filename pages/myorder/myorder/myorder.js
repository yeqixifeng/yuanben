// pages/myorder/myorder/myorder.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    dabao: [],
    peisong: [],
    wancheng: [],
    list: [],
  },
  changetype: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  //查看订单页
  toDeliver(e) {
    wx.navigateTo({
      url: '/pages/myorder/deliver/deliver?orderid=' + e.currentTarget.dataset.orderid
    })
  },
  //司机配送页
  toDriver(e) {
    wx.navigateTo({
      url: '/pages/myorder/driver/driver?orderid=' + e.currentTarget.dataset.orderid
    })
  },
  //确认套餐订单页
  toComfirm(e) {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'order/submitMealOrder',
      data: {
        orderId: e.currentTarget.dataset.orderid
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.code == 0) {
          wx.setStorageSync('taocan', res.data.order)
          wx.navigateTo({
            url: '/pages/myorder/confirm/comfirm'
          })
        }
        else if (res.code == 500) {
          wx.showToast({
            title: '配送失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //快递配送页
  toLogistics() {
    wx.navigateTo({
      url: '/pages/myorder/logistics/logistics'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'order/getUserOrder',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data)
        let list = res.data.order
        let dabao = []
        let peisong = []
        let wancheng = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].status == '待配送' || list[i].status == '备货中') {
            dabao.push(list[i])
          } else if (list[i].status == '配送中') {
            peisong.push(list[i])
          } else if (list[i].status == '已完成') {
            wancheng.push(list[i])
          }
        }
        that.setData({
          type: type,
          list: list,
          dabao: dabao,
          peisong: peisong,
          wancheng: wancheng
        })
      }
    })
  },
  load() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'order/getUserOrder',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data)
        let list = res.data.order
        let dabao = []
        let peisong = []
        let wancheng = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].status == '待配送' || list[i].status == '备货中') {
            dabao.push(list[i])
          } else if (list[i].status == '配送中') {
            peisong.push(list[i])
          } else if (list[i].status == '已完成') {
            wancheng.push(list[i])
          }
        }
        that.setData({
          list: list,
          dabao: dabao,
          peisong: peisong,
          wancheng: wancheng
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
    wx.switchTab({
      url: '/pages/owner/owner/owner'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    that.load()
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