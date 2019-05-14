// pages/recharge/recharge.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: ''
  },
  toSuccess2() {
    var that = this;
    let form = {}
    form.rechargeNum = that.data.money
    form.rechargeType = 0
    let item = JSON.stringify(form)
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/recharge',
      data: item,
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/json'
      },
      success(res) {
        if(res.data.code==0){
          let pay = res.data.data
          let amount = res.data.log.amountLogId
          wx.requestPayment({
            timeStamp: String(pay.timeStamp),
            nonceStr: pay.nonceStr,
            package: pay.package,
            signType: 'MD5',
            paySign: pay.sign,
            success(res) {
              console.log(1111)
              wx.request({
                url: app.globalData.url + 'user/rechargeSuccess',
                data: {
                  amountLogId: amount,
                  rechargeType: 0,
                  paySuccess: 0,
                },
                method: 'post',
                header: {
                  'token': session,
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                  if(res.data.code==0){
                    wx.showToast({
                      title: '充值成功',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  else{
                    wx.showToast({
                      title: '充值失败，请联系客服',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            },
            fail(res) {
              wx.request({
                url: app.globalData.url + 'user/rechargeSuccess',
                data: {
                  amountLogId: amount,
                  rechargeType: 0,
                  paySuccess: 1,
                },
                method: 'post',
                header: {
                  'token': session,
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                }
              })
              wx.showToast({
                title: '充值失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            duration: 2000
          })
        }

      }
    })


  },
  rechargeInput(e) {
    var that = this
    that.setData({
      money: e.detail.value
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