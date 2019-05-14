// pages/owner/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    sex: '男',
    src: '',
    user: '',
    mobile: '',
    nickName: '',
    ispassword:'',
  },
  toName() {
    wx.navigateTo({
      url: '/pages/owner/changename/changename'
    })
  },
  toPhone() {
    wx.navigateTo({
      url: '/pages/owner/phone/phone'
    })
  },
  toForget() {
    wx.navigateTo({
      url: '/pages/owner/forget/forget'
    })
  },
  toPassword() {
    wx.navigateTo({
      url: '/pages/owner/password/password'
    })
  },
  // 提交改变
  change(){
    var that = this;
    let sex=''
    if(that.data.sex=='男'){
      sex=1
    }
    else if(that.data.sex=='女'){
      sex=0
    }
    else{
      sex=2
    }
    let info={}
    info.avatar=that.data.src
    info.birthday=that.data.date
    info.nickName=that.data.nickName
    info.phone=that.data.mobile
    info.sex=that.data.sex
    info=JSON.stringify(info)
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/updateUser',
      method: 'post',
      data:info,
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  exitLogin() {
    this.change()
    wx.switchTab({
      url: '/pages/owner/owner/owner'
    })
  },
  // 改变日期
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 改变性别
  changesex() {
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.setData({
            sex: "男"
          })
        } else if(res.tapIndex == 1){
          that.setData({
            sex: "女"
          })
        }
        
      },
      fail: function (res) {

      }
    })
  },
  // 改变头像
  changetx() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.chooseImage({
      count: 1, // 选择的图片张数
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths[0])
        that.setData({
          src:res.tempFilePaths[0]
        })
        wx.uploadFile({
          url: app.globalData.url+'file/upload', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          formData: {
            file: res.tempFilePaths[0]
          },
          header: {
            'content-type': 'multipart/form-data'  // 默认值
          },
          name: 'file',
          success(res) {
            let data = JSON.parse(res.data)　　
            console.log(data.data.url)
            that.setData({
               src:data.data.url
            })
          },
          
        })
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        that.setData({
          user: res.data.user,
          sex: res.data.user.sex,
          mobile: res.data.user.mobile,
          nickName: res.data.user.nickName,
          src:res.data.user.avatar,
          date:res.data.user.birthday
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
    var that=this
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'user/getUserInfo',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        if (res.data.user.password) {
          that.setData({
            ispassword:true
          })
        }
        else {
          that.setData({
            ispassword:false
          })
        }
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