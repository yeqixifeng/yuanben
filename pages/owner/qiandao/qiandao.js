// pages/owner/qiandao/qiandao.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: '',
    zuonum: '',
    day4num: '',
    day5num: '',
    day6num: '',
    day7num: '',
    day4: '',
    day5: '',
    day6: '',
    day7: '',
    isCheck: '',
    list: ''
  },
  qianDao() {
    if (this.data.check.isCheck == 0) {
      var that = this;
      const session = wx.getStorageSync('session')
      wx.request({
        url: app.globalData.url + 'checkIn',
        method: 'get',
        header: {
          'token': session,
          'content-type': 'application/json'  // 默认值
        },
        success(res) {
          const session = wx.getStorageSync('session')
          wx.request({
            url: app.globalData.url + 'getCheckInInfo',
            method: 'get',
            header: {
              'token': session,
              'content-type': 'application/json'  // 默认值
            },
            success(res) {
              that.setData({
                isCheck: res.data.check.isCheck,
                check: res.data.check
              })
              wx.showToast({
                title: '签到成功',
                icon: 'none'
              })
              that.detail()
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.load()
    that.detail()
  },
  load() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'getCheckInInfo',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        that.setData({
          check: res.data.check,
          isCheck: res.data.check.isCheck
        })
        var today = that.data.check.tadayIntegral
        var contDays = that.data.check.contDays
        if (today == 1 || today == 0) {
          that.setData({
            zuonum: 0,
            day4num: 3,
            day5num: 4,
            day6num: 5,
            day7num: 5,
          })
        }
        if (today == 2) {
          that.setData({
            zuonum: 1,
            day4num: 4,
            day5num: 5,
            day6num: 5,
            day7num: 5,
          })
        }
        if (today == 3) {
          that.setData({
            zuonum: 2,
            day4num: 5,
            day5num: 5,
            day6num: 5,
            day7num: 5,
          })
        }
        if (today == 4) {
          that.setData({
            zuonum: 3,
            day4num: 5,
            day5num: 5,
            day6num: 5,
            day7num: 5,
          })
        }
        if (today == 5 && contDays < 6) {
          that.setData({
            zuonum: 4,
            day4num: 5,
            day5num: 5,
            day6num: 5,
            day7num: 5,
          })
        }
        if (today == 5 && contDays > 5) {
          that.setData({
            zuonum: 5,
            day4num: 5,
            day5num: 5,
            day6num: 5,
            day7num: 5,
          })
        }
      }
    })
    //算日期
    var day4 = new Date();
    day4.setDate(day4.getDate() + 2);
    var m4 = day4.getMonth() + 1;//获取当前月份的日期
    var d4 = day4.getDate();
    var s4 = m4 + '.' + d4
    var day5 = new Date();
    day5.setDate(day5.getDate() + 3);
    var m5 = day5.getMonth() + 1;//获取当前月份的日期
    var d5 = day5.getDate();
    var s5 = m5 + '.' + d5
    var day6 = new Date();
    day6.setDate(day6.getDate() + 4);
    var m6 = day6.getMonth() + 1;//获取当前月份的日期
    var d6 = day6.getDate();
    var s6 = m6 + '.' + d6
    var day7 = new Date();
    day7.setDate(day7.getDate() + 5);
    var m7 = day7.getMonth() + 1;//获取当前月份的日期
    var d7 = day7.getDate();
    var s7 = m7 + '.' + d7
    that.setData({
      day4: s4,
      day5: s5,
      day6: s6,
      day7: s7,
    })
    //一周获取积分

  },
  detail() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/getUserIntegralBlance',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          list: res.data.data
        })
      }
    })
  },
  ncy() {
    var that = this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/GetVoucher',
      method: 'get',
      data: {
        type: 0,
        blance: 500
      },
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '兑换成功',
            icon: 'none'
          })
          that.load()
          that.detail()
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
  ms() {
    var that = this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/GetVoucher',
      method: 'get',
      data: {
        type: 2,
        blance: 500
      },
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '兑换成功',
            icon: 'none'
          })
          that.load()
          that.detail()
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