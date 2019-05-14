// pages/find/find.js
var app=getApp()
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
    need:{},
    regionTwo:'',
    regionTherr:''
  },
  tofooddetails(e){
    wx.navigateTo({
      url: '/pages/fooddetails/fooddetails?foodid='+e.currentTarget.dataset.food
    })
  },
  tonowfood(){
    wx.navigateTo({
      url: '/pages/food/nowfood/nowfood'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url+'getBanner', 
      method:'get',
      header: {
        'token':session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res)
        var banner=[];
        for(let i=0;i<res.data.banner.listBannerImg.length;i++){
          banner.push(res.data.banner.listBannerImg[i].url)
        }
        that.setData({
          imgUrls:banner,
          need:res.data
        })
      }
    })
    var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
  var qqmapsdk;
  qqmapsdk = new QQMapWX({
    key: 'DKRBZ-BEYK3-BOI3F-YKXMW-RWWC3-WCFVD'
  });
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (addressRes) {
          that.setData({
            regionTwo: addressRes.result.address_component.city,//市
            regionTherr: addressRes.result.address_component.district,//区
          })
        }
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