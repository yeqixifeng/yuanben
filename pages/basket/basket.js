// pages/basket/basket.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    foodnum: 1,
    totalPrice: 0,
    selectAllStatus: true,
    isDiscount: ''
  },
  //跳转确认订单
  toOrder() {
    let that = this
    that.submitShoppingCart()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/listShoppingCart',
      method: 'get',
      header: {
        'token': session,
        'content-type': 'application/json'  // 默认值
      },
      success(res) {
        console.log(res.data)
        let goods = res.data.shoppingCart
        for (let i = 0; i < goods.length; i++) {
          goods[i].selected = true
        }
        that.setData({
          list: goods,
          isDiscount: options.discount
        })
        that.count_price();
      }
    })
  },
  tonowfood(){
    wx.navigateTo({
      url: '/pages/food/nowfood/nowfood'
    })
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },
  /**
    * 购物车全选事件
    */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  /**
   * 绑定加数量事件
   */
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].goodsSize;
    // 点击递增
    num = num + 1;
    list[index].goodsSize = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/addShoppingCart',
      method: 'post',
      data: {
        goodsId: list[index].goodsId,
        cartState: 1,
        skuId: list[index].skuId,
        goodsSize: 1,
      },
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {

      }
    })
    // 计算金额方法
    this.count_price();
  },
  /**
    * 绑定减数量事件
    */
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    // console.log(obj);
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].goodsSize;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].goodsSize = num;
    // 渲染页面
    this.setData({
      list: list
    });
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/addShoppingCart',
      method: 'post',
      data: {
        goodsId: list[index].goodsId,
        cartState: 1,
        skuId: list[index].skuId,
        goodsSize: -1,
      },
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {

      }
    })
    // 调用计算金额方法
    this.count_price();
  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = that.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        console.log(list[index].shoppingCartId)
        const session = wx.getStorageSync('session')
        wx.request({
          url: app.globalData.url + 'shoppingCart/removeShoppingCart',
          method: 'get',
          data: {
            shoppingCartId: list[index].shoppingCartId
          },
          header: {
            'token': session,
            'content-type': 'application/json'  // 默认值
          },
          success(res) {
            console.log(res)
          }
        })
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
              hasList: false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {

        }
      },
      fail: function (res) {

      }
    })
  },

  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (this.data.isDiscount == 0) {
        if (list[i].selected) {
          // 所有价格加起来 count_money
          total += list[i].goodsSize * list[i].sku.memberPrice;
        }
      }
      else {
        if (list[i].selected) {
          // 所有价格加起来 count_money
          total += list[i].goodsSize * list[i].sku.preferentialPrice;
        }
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },
  // 提交订单
  submitShoppingCart() {
    let that = this;
    let list = that.data.list;
    let form = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        form.push(list[i].shoppingCartId)
      }
    }
    let firm = JSON.stringify(form)
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/submitShoppingCart',
      data: firm,
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/json;charset=utf-8'  // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.setStorageSync('order', res.data)
          wx.showToast({
            title: '正在生成订单',
            icon: 'loading',
            duration: 2000,
            success(res) {
              wx.navigateTo({
                url: '/pages/order/order'
              })
            }
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