// pages/address/manage/managa.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    addressList:''
  },
  //新建地址
  toAdd(){
    wx.navigateTo({
      url: '/pages/address/add/add'
    })
  },
  //改变默认地址
  changeselect(e){
    const add=this.data.addressList;
    for(let i=0;i<add.length;i++){
      add[i].defaultAddress=1;
    }
    add[e.currentTarget.dataset.moren].defaultAddress=0;
    this.setData({
      addressList:add
    })
    const session = wx.getStorageSync('session')
    const user=Number(add[e.currentTarget.dataset.moren].userId)
   
    wx.request({
      url: app.globalData.url+'updateAddressById', // 仅为示例，并非真实的接口地址
      data: {
        userId:user,
        name:add[e.currentTarget.dataset.moren].name,
        mobile:add[e.currentTarget.dataset.moren].mobile,
        province:add[e.currentTarget.dataset.moren].province,
        city:add[e.currentTarget.dataset.moren].city,
        county:add[e.currentTarget.dataset.moren].county,
        street:add[e.currentTarget.dataset.moren].street,
        defaultAddress:add[e.currentTarget.dataset.moren].defaultAddress,
        deliveryAddressId:add[e.currentTarget.dataset.moren].deliveryAddressId
      },
      method:'post',
      header: {
        'token':session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        
      }
    })
  },
  //编辑地址
  toEdit(e){
    wx.navigateTo({
      url: '/pages/address/edit/edit?addressId='+e.currentTarget.dataset.addressid
    })
  },
  //删除地址
  deleteAddress(e){
    var that=this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url+'removeAddressById', 
      data: {
        addressId:e.currentTarget.dataset.address
      },
      method:'get',
      header: {
        'token':session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        const session = wx.getStorageSync('session')
        wx.request({
          url: app.globalData.url+'getAddressList', 
          method:'get',
          header: {
            'token':session,
            'content-type': 'application/json'  
          },
          success(ress) {
            that.setData({
              addressList:ress.data.address
            })
          }
        })
      }
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
    var that=this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url+'getAddressList', 
      method:'get',
      header: {
        'token':session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        that.setData({
          addressList:res.data.address
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