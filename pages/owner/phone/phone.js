// pages/owner/phone/phone.js
var app=getApp()
var countdown = 60;
var settime = function (that) {
 if (countdown == 0) {
  that.setData({
   is_show: true
  })
  countdown = 60;
  return;
 } else {
  that.setData({
   is_show:false,
   seconds:countdown
  })
 
  countdown--;
 }
 setTimeout(function () {
  settime(that)
 }
  , 1000)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds: 0, // 读秒
    is_show:true,
    phone: '',
    code: '',
  },
  toBack(){
    var that = this
    let code=that.data.code
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/chkCode',
      data: {
        code: code
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            mobile: that.data.phone
          })
          wx.navigateBack({
            delta: 1
          })
        }
        else {
          wx.showToast({
            title: '验证码错误',
            icon: 'none'
          })
        }
      }
    })
  },
  // 倒计时
  clickVerify:function(){
    var that = this;
    const session = wx.getStorageSync('session')
    if ((/^1[345789]\d{9}$/.test(that.data.phone))) {
      wx.request({
        url: app.globalData.url + 'user/sendChkCode',
        data: {
          mobile: that.data.phone
        },
        method: 'post',
        header: {
          'token': session,
          'content-type': 'application/x-www-form-urlencoded'  // 默认值
        },
        success(res) {
          if (res.data.code == 0) {
            that.setData({
              is_show: (!that.data.is_show),  //false
              is_back: false
            })
            settime(that);
          }
          else {
            wx.showToast({
              title: '短信发送失败',
              icon: 'none'
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '手机格式不正确',
        icon: 'none'
      })
    }
   },
     // 获取手机号
  phoneInput(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  // 获取验证码
  codeInput(e) {
    var that = this
    that.setData({
      code: e.detail.value
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