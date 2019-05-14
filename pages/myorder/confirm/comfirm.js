// pages/myorder/confirm/comfirm.js
Page({
  type: 1,
  /**
   * 页面的初始数据
   */
  data: {
    timer: '',
    createTime: '',
    hour: '',
    minute: '',
    second: '',
    deliveryNum: '',
    hun: '',
    su: '',
    qita: '',
    cmonth: '',
    cday: ''
  },
  toBack() {
    wx.switchTab({
      url: '/pages/owner/owner/owner'
    })
  },
  toNowfood() {
    wx.navigateTo({
      url: '/pages/food/nowfood/nowfood'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  time() {
    var that = this
    let order = wx.getStorageSync('taocan')
    let createTime = order.createTime
    that.setData({
      timer: setInterval(function () {
        var oDate = new Date();//获取日期对象
        var oldTime = oDate.getTime();//现在距离1970年的毫秒数
        var newDate = new Date(Date.parse(createTime.replace(/-/g, "/")));;
        var newTime = newDate.getTime();//2019年距离1970年的毫秒数
        newTime = newTime + 2 * 60 * 60 * 1000;
        var second = Math.floor((newTime - oldTime) / 1000);//未来时间距离现在的秒数
        var second2 = Math.floor((newTime - oldTime) / 1000);//未来时间距离现在的秒数
        var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
        second = second % 86400;//余数代表剩下的秒数；
        var hour = Math.floor(second / 3600);//整数部分代表小时；
        second %= 3600; //余数代表 剩下的秒数；
        var minute = Math.floor(second / 60);
        second %= 60;
        var second1 = Math.floor(second);
        that.setData({
          hour: hour,
          minute: minute,
          second: second1
        })
        if (second2 <= 0) {
          clearInterval(that.data.timer);
        }

      }, 1000)
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
    var that = this
    let hun = []
    let su = []
    let qita = []
    let order = wx.getStorageSync('taocan')
    console.log(order)
    let item = order.listMealGoods
    let consign = order.consignTime
    let cmonth = new Date(Date.parse(consign.replace(/-/g, "/"))).getMonth() + 1
    let cday = new Date(Date.parse(consign.replace(/-/g, "/"))).getDate()
    for (let i = 0; i < item.length; i++) {
      if (item[i].category == '荤菜') {
        hun.push(item[i])
      }
      else if (item[i].category == '素菜') {
        su.push(item[i])
      }
      else if (item[i].category == '其他') {
        qita.push(item[i])
      }
    }
    that.setData({
      deliveryNum: order.deliveryNum,
      hun,
      su,
      qita,
      cmonth,
      cday
    })
    that.time()
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