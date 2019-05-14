// pages/address/edit/edit.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    region: ['', '', ''],
    customItem: '全部',
    userName:'',
    userAddress:'',
    userPhone:'',
    is_select:'',
    deliveryAddressId:''
  },
  toBack(){
    const session = wx.getStorageSync('session')
    const user=Number(this.data.userId)
    const select=String(this.data.is_select)
    wx.request({
      url: app.globalData.url+'updateAddressById', // 仅为示例，并非真实的接口地址
      data: {
        userId:user,
        name:this.data.userName,
        mobile:this.data.userPhone,
        province:this.data.region[0],
        city:this.data.region[1],
        county:this.data.region[2],
        street:this.data.userAddress,
        defaultAddress:this.data.is_select,
        deliveryAddressId:this.data.deliveryAddressId
      },
      method:'post',
      header: {
        'token':session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  select(){
    if (this.data.is_select==1) {
      this.setData({
        is_select:0
      })
    }
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  userNameInput:function(e)
  {
    this.setData({
      userName: e.detail.value
    })
  },
  userAddressInput:function(e)
  {
    this.setData({
      userAddress: e.detail.value
    })
  },
  userPhoneInput:function(e)
  {
    this.setData({
      userPhone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const session = wx.getStorageSync('session')
    console.log(options)
    const add=Number(options.addressId)
    wx.request({
      url: app.globalData.url+'getAddressById', // 仅为示例，并非真实的接口地址
      data: {
        addressId:add
      },
      method:'get',
      header: {
        'token':session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res)
       that.setData({
        deliveryAddressId:add,
        userId:res.data.address.userId,
        region: [res.data.address.province, res.data.address.city, res.data.address.county],
        userName:res.data.address.name,
        userAddress:res.data.address.street,
        userPhone:res.data.address.mobile,
        is_select:res.data.address.defaultAddress,
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