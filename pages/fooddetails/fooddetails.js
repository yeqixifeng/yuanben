// pages/fooddetails/fooddetails.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://h5.hyweb.com.cn/yuanben/find/swiper.png',
      'http://h5.hyweb.com.cn/yuanben/find/swiper.png',
      'http://h5.hyweb.com.cn/yuanben/find/swiper.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    foodnum: 1,
    reply: false,
    gouwu: false,
    sku: '0',
    goods: '',
    detiel: '',
    address: '',
    basketNum: '',
    discount:'',
    goodsId:''
  },
  openGouwu() {
    this.setData({
      gouwu: !this.data.gouwu
    })
  },
  openReply() {
    this.setData({
      reply: !this.data.reply
    })
  },
  closeGouwu() {
    this.setData({
      gouwu: !this.data.gouwu
    })
  },
  closeReply() {
    this.setData({
      reply: !this.data.reply
    })
  },
  toBasket1() {
    wx.navigateTo({
      url: '/pages/basket/basket?discount='+this.data.discount
    })
  },
  gouwulan() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/listShoppingCart',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        let basketNum = 0
        for(let i=0;i<res.data.shoppingCart.length;i++){
          basketNum+=res.data.shoppingCart[i].goodsSize
        }
        that.setData({
          basketNum: basketNum
        })

      }
    })
  },
  toBasket() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/addShoppingCart',
      data: {
        goodsId: that.data.goods.goodsId,
        cartState: 1,
        skuId: that.data.goods.sku[that.data.sku].goodsSkuId,
        goodsSize: that.data.foodnum,
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/basket/basket?discount='+that.data.discount
        })
      }
    })
  },
  toOrder() {
    let that = this;
    let order = {}
    order.list = []
    order.list[0]={}
    order.list[0].goods={}
    order.list[0].sku={}
    order.isDiscount=that.data.discount
    order.list[0].goodsId = that.data.goods.goodsId
    order.list[0].goods.showMasterMap = that.data.goods.showMasterMap
    order.list[0].goods.title = that.data.goods.title
    order.list[0].sku.isSpecification = that.data.goods.sku[0].isSpecification
    order.list[0].skuId = that.data.goods.sku[0].goodsSkuId
    order.list[0].goodsSize = that.data.foodnum
    order.list[0].sku.memberPrice = that.data.goods.sku[0].memberPrice
    order.list[0].sku.preferentialPrice = that.data.goods.sku[0].preferentialPrice
    console.log(order)
    wx.setStorageSync('order', order)
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  toEdit(e) {
    if(this.data.address==null){
      wx.navigateTo({
        url: '/pages/address/manage/managa' 
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/address/edit/edit?addressId=' + e.currentTarget.dataset.addressid
      })
    }
  },
  changeSelete(e) {
    this.setData({
      sku: e.currentTarget.dataset.sku
    })
  },
  numJian() {
    if (this.data.foodnum > 1) {
      let num = this.data.foodnum
      num--;
      this.setData({
        foodnum: num
      })
    }
  },
  numJia() {
    let num = this.data.foodnum
    num++;
    this.setData({
      foodnum: num
    })
  },
  move: function () { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const session = wx.getStorageSync('session')
    that.setData({
      goodsId:options.foodid
    })
    wx.request({
      url: app.globalData.url + 'getGoodsById?goodsId=' + options.foodid,
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        let goods = res.data.goods;
        let address = res.data.address;
        let banner = [];
        for (let i = 0; i < goods.showUpforMap.length; i++) {
          banner.push(goods.showUpforMap[i].url)
        }
        console.log(goods)
        that.setData({
          goods: goods,
          imgUrls: banner,
          address: address,
          discount:res.data.discount
        })
        console.log(that.data.goods)
        WxParse.wxParse('detiel', 'html', goods.detailMap, that, 0)
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
    var that = this;
    const session = wx.getStorageSync('session')
    console.log(that.data.goods)
    wx.request({
      url: app.globalData.url + 'getGoodsById?goodsId=' + that.data.goodsId,
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res)
        let address = res.data.address;
        that.setData({
          address: address,
        })
      }
    })
    that.gouwulan()
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