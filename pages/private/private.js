// pages/private/private.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false
  },
  // 直播
  toBroadcast() {
    wx.navigateTo({
      url: '/pages/broadcast/broadcast'
    })
  },
  // 今日菜品
  toNowfood() {
    wx.navigateTo({
      url: '/pages/food/nowfood/nowfood'
    })
  },
  //配送：配送中
  toMyorder3() {
    wx.navigateTo({
      url: '/pages/myorder/myorder/myorder?type=3'
    })
  },
  // 农场游活动
  toActive() {
    wx.navigateTo({
      url: '/pages/details/active/active'
    })
  },
  bindGetUserInfo() {
    this.setData({
      isshow: !this.data.isshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 登录              
              let info = res.userInfo
              wx.login({
                success: res => {
                  console.log(res.code)
                  wx.request({
                    url: app.globalData.url +'login', 
                    data: {
                      code: res.code,
                      nickName: info.nickName,
                      avatar: info.avatarUrl
                    },
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'  // 默认值
                    },
                    success(res) {
                      console.log(res)
                      wx.setStorageSync('session', res.data.token)
                    }
                  })
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
              })
            }
          })
        }
        else {
          this.setData({
            isshow: !this.data.isshow
          })
          wx.getUserInfo({
            success: res => {
              // 登录
              wx.login({
                success: res => {

                  wx.request({
                    url: app.globalData.url +'login', // 仅为示例，并非真实的接口地址
                    data: {
                      code: res.code,
                      nickName: info.nickName,
                      avatar: info.avatarUrl
                    },
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'  // 默认值
                    },
                    success(res) {
                      console.log(res.data)
                      wx.setStorageSync('session', res.data.token)
                    }
                  })
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
              })
            }
          })
        }
      },
      fail: res => {

      }
    }),
      wx.getLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
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