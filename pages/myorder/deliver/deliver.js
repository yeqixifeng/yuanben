// pages/myorder/deliver/deliver.js
var app=getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    is_open:false,
    is_open2:false,
    grade:1,
    order:'',
    list:'',
    tc1:'',
    tc2:'',
    total:'',
    packer:'',
  },
  listopen:function(){
    this.setData({
      is_open:!this.data.is_open
    })
  },
  listopen2:function(){
    this.setData({
      is_open2:!this.data.is_open2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderid=options.orderid
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'order/getOrderInfo',
      method: 'get',
      data:{
        orderId:orderid
      },
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          order:res.data.order,
          list:res.data.data
        })
        if(res.data.order.orderType=='普通订单'){
          that.setData({
           grade:1,
          })
        }
        // 套餐分开
        else if(res.data.order.orderType=='套餐订单'){
          that.setData({
            grade:3
           })
          let items= res.data.data
          let tc1=[]
          let tc2=[]
          let total=0
          for(let i=0 ; i<items.length ; i++){
            if(items[i].isMeal=='是'){
              tc1.push(items[i])
            }
            if(items[i].isMeal=='否'){
              tc2.push(items[i])
            }
          }
          for(let j=0 ; j<tc2.length ; j++){
            total+=tc2[j].price*tc2[j].goodsSize
          }
          that.setData({
            packer:res.data.packer,
            tc1,
            tc2,
            total
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