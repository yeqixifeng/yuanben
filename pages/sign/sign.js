// pages/sign/sign.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds: 0, // 读秒
    is_show: true,
    username: '',
    password: ''
  },
  sign() {
    var that=this
    let form = {}
    if(that.data.username==''){
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      })
    }
    else if(that.data.password==''){
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    }
    else{
      form.username=that.data.username
      form.password=that.data.password
      let item = JSON.stringify(form)
      wx.request({
        url: app.globalData.url + 'deliveryLogin',
        data: item,
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if(res.data.code==0){
            wx.setStorageSync('siji', res.data.token)
            wx.navigateTo({
              url: '/pages/siji/examine/examine'
            })
          }
          else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  password(e) {
    var that = this
    that.setData({
      password: e.detail.value
    })
  },
  username(e) {
    var that = this
    that.setData({
      username: e.detail.value
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