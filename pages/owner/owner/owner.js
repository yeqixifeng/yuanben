// pages/owner/owner.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islog: 1,
    rank: 3,
    user: '',
    hun: '',
    su: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 司机端登录页
  toSign() {
    wx.navigateTo({
      url: '/pages/sign/sign'
    })
  },
  //个人设置页
  toSetting() {
    wx.navigateTo({
      url: '/pages/owner/setting/setting'
    })
  },
  //买会员年卡页
  toHuiyuan() {
    wx.navigateTo({
      url: '/pages/buycard/huiyuan/huiyuan'
    })
  },
  //买会员季卡页
  toChengwei() {
    wx.navigateTo({
      url: '/pages/buycard/chengwei/chengwei'
    })
  },
  //农场游
  toNcy() {
    wx.navigateTo({
      url: '/pages/card/ncy/ncy'
    })
  },
  //私厨服务
  toSc() {
    wx.navigateTo({
      url: '/pages/card/sc/sc'
    })
  },
  //民宿住宿
  toMs() {
    wx.navigateTo({
      url: '/pages/card/ms/ms'
    })
  },
  //宅配体验
  toZp() {
    wx.navigateTo({
      url: '/pages/card/zp/zp'
    })
  },
  //私人会所
  toSr() {
    wx.navigateTo({
      url: '/pages/card/sr/sr'
    })
  },
  //膳食报告
  toReport() {
    wx.navigateTo({
      url: '/pages/owner/report/report'
    })
  },
  //地址管理页
  toManage() {
    wx.navigateTo({
      url: '/pages/address/manage/managa'
    })
  },
  //投诉页
  toComplaint() {
    wx.navigateTo({
      url: '/pages/owner/complaint/complaint'
    })
  },
  //配送：全部
  toMyorder1() {
    wx.navigateTo({
      url: '/pages/myorder/myorder/myorder?type=1'
    })
  },
  //配送：待配送
  toMyorder2() {
    wx.navigateTo({
      url: '/pages/myorder/myorder/myorder?type=2'
    })
  },
  //配送：配送中
  toMyorder3() {
    wx.navigateTo({
      url: '/pages/myorder/myorder/myorder?type=3'
    })
  },
  //配送：已完成
  toMyorder4() {
    wx.navigateTo({
      url: '/pages/myorder/myorder/myorder?type=4'
    })
  },
  //签到积分页
  toQiandao() {
    wx.navigateTo({
      url: '/pages/owner/qiandao/qiandao'
    })
  },
  //配送：余额
  toBalance() {
    wx.navigateTo({
      url: '/pages/owner/balance/balance'
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
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/getUserInfo',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          user: res.data.user,
          rank: res.data.user.member.type,
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