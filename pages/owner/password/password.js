// pages/owner/password/password.js
var app = getApp()
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: false,
      seconds: countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }
    , 1000)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds: 0, // 读秒
    is_show: true,
    is_back: true,
    password: '',
    confirm: '',
    phone: '',
    code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 倒计时，发送短信
  clickVerify: function () {
    var that = this;
    // 将获取验证码按钮隐藏60s，60s后再次显示
    const session = wx.getStorageSync('session')
    if ((/^1[345789]\d{9}$/.test(that.data.phone))) {
      wx.request({
        url: app.globalData.url + 'user/sendChkCode',
        data: {
          mobile: that.data.phone
        },
        method: 'post',
        header: {
          'token': session,
          'content-type': 'application/x-www-form-urlencoded'  // 默认值
        },
        success(res) {
          if (res.data.code == 0) {
            that.setData({
              is_show: (!that.data.is_show),  //false
              is_back: false
            })
            settime(that);
          }
          else {
            wx.showToast({
              title: '短信发送失败',
              icon: 'none'
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '手机格式不正确',
        icon: 'none'
      })
    }

  },

  // 获取交易密码
  passWdInput(e) {
    var that = this
    that.setData({
      password: e.detail.value
    })
  },
  // 获取确认交易密码
  confirmInput(e) {
    var that = this
    that.setData({
      confirm: e.detail.value
    })
  },
  // 获取手机号
  phoneInput(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  // 获取验证码
  codeInput(e) {
    var that = this
    that.setData({
      code: e.detail.value
    })
  },
  // 返回上一页
  toBack() {
    var that = this
    let password = that.data.password
    let confirm = that.data.confirm
    let phone = that.data.phone
    let code = that.data.code
    let reg=/^\d{6}$/;
    const session = wx.getStorageSync('session')
    if (password == '') {
      wx.showToast({
        title: '请输入交易密码',
        icon: 'none'
      })
    }
    else if (!reg.test(password)) {
      wx.showToast({
        title: '密码必须为6位数字',
        icon: 'none'
      })
    }
    else if (confirm == '') {
      wx.showToast({
        title: '请确认交易密码',
        icon: 'none'
      })
    }
    else if (phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    }
    else if (code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
    }
    else {
      if (!password == confirm) {
        wx.showToast({
          title: '交易密码不一致',
          icon: 'none'
        })
      }
      else {
        wx.request({
          url: app.globalData.url + 'user/chkCode',
          data: {
            code: code
          },
          method: 'post',
          header: {
            'token': session,
            'content-type': 'application/x-www-form-urlencoded'  // 默认值
          },
          success(res) {
            if (res.data.code == 0) {
              wx.request({
                url: app.globalData.url + 'user/updatePassword',
                data: {
                  password: password
                },
                method: 'post',
                header: {
                  'token': session,
                  'content-type': 'application/x-www-form-urlencoded'  // 默认值
                },
                success(res) {
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '密码设置成功',
                      icon: 'none'
                    })
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                  else {
                    wx.showToast({
                      title: '密码设置失败',
                      icon: 'none'
                    })
                  }
                }
              })
            }
            else {
              wx.showToast({
                title: '验证码错误',
                icon: 'none'
              })
            }
          }
        })
      }
    }


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