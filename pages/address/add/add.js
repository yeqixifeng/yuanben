// pages/address/add/add.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    userName: '',
    userAddress: '',
    userPhone: '',
    is_select: 0,
  },
  toBack() {
    if (this.data.userName != 0 && this.data.userAddress != 0 && this.data.userPhone != 0) {
      const session = wx.getStorageSync('session')
      wx.request({
        url: app.globalData.url + 'addAddress',
        data: {
          name: this.data.userName,
          mobile: this.data.userPhone,
          province: this.data.region[0],
          city: this.data.region[1],
          county: this.data.region[2],
          street: this.data.userAddress,
          defaultAddress: this.data.is_select,
        },
        method: 'post',
        header: {
          'token': session,
          'content-type': 'application/x-www-form-urlencoded'  // 默认值
        },
        success(res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }

  },
  select() {
    if (this.data.is_select == 0) {
      this.setData({
        is_select: 1
      })
    }
    else {
      this.setData({
        is_select: 0
      })
    }
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userAddressInput: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
  },
  userPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
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