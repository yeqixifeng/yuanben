// pages/food/nowfood/nowfood.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount: '',
    goods: '',
    grade: 3,
    type: 1,
    foodnum: 0,
    su: '',
    hun: '',
    qita: '',
    yyb: '',
    basketNum: '',
    orderId: '',
    isReplace: '',
    cmonth: '',
    cday: '',
    omonth: '',
    oday: '',
    ohour: ''
  },
  // 改变选项
  changetype: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  toChangefood(e) {
    wx.navigateTo({
      url: '/pages/food/changefood/changefood?mealid=' + e.currentTarget.dataset.orderitemid + '&goodsid=' + e.currentTarget.dataset.goodid
    })
  },
  toComfirm() {
    var that = this;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'order/submitMealOrder',
      data: {
        orderId: that.data.orderId
      },
      method: 'post',
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.code == 0) {
          wx.setStorageSync('taocan', res.data.order)
          wx.navigateTo({
            url: '/pages/myorder/confirm/comfirm'
          })
        }
        else if (res.code == 500) {
          wx.showToast({
            title: '配送失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  toTcdetails(e) {
    wx.navigateTo({
      url: '/pages/tcdetails/tcdetails?foodid=' + e.currentTarget.dataset.goodid
    })
  },
  toFooddetails(e) {
    wx.navigateTo({
      url: '/pages/fooddetails/fooddetails?foodid=' + e.currentTarget.dataset.goodid
    })
  },
  toBasket() {
    wx.navigateTo({
      url: '/pages/basket/basket?discount=' + this.data.discount
    })
  },
  // 购物篮载入
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
  // 商品页面载入
  foodload() {
    var that = this;
    const session = wx.getStorageSync('session')
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    if (prevpage.route == 'pages/private/private' || prevpage.route == 'pages/food/changefood/changefood') {
      wx.request({
        url: app.globalData.url + 'getMealByUser',
        method: 'get',
        header: {
          'token': session,
          'content-type': 'application/json'  // 默认值
        },
        success(res) {
          // 无套餐
          if (!res.data.data.orderType) {
            let goods = res.data.data
            let su = []
            let hun = []
            let qita = []
            for (let i = 0; i < goods.length; i++) {
              if (goods[i].category == '素菜') {
                su.push(goods[i])
              }
              else if (goods[i].category == '荤菜') {
                hun.push(goods[i])
              }
              else if (goods[i].category == '其他') {
                qita.push(goods[i])
              }
            }
            that.setData({
              goods: goods,
              su: su,
              hun: hun,
              qita: qita,
              grade: 2,
              discount: res.data.discount
            })
            that.yyb1()
          }
          // 有套餐
          else {
            let meal = res.data.data.listMealGoods
            let orderId = res.data.data.orderId
            let isReplace = res.data.data.isReplace
            let su = []
            let hun = []
            let qita = []
            let consign = res.data.data.consignTime
            let newDate = new Date(Date.parse(consign.replace(/-/g, "/")));
            let newTime = newDate.getTime();//距离1970年的毫秒数
            let cmonth = new Date(Date.parse(consign.replace(/-/g, "/"))).getMonth() + 1
            let cday = new Date(Date.parse(consign.replace(/-/g, "/"))).getDate()
            let onTime = newTime - 2 * 24 * 60 * 60 * 1000;
            let omonth = new Date(onTime).getMonth() + 1
            let oday = new Date(onTime).getDate()
            let ohour = new Date(onTime).getHours()
            for (let i = 0; i < meal.length; i++) {
              if (meal[i].category == '素菜') {
                su.push(meal[i])
              }
              else if (meal[i].category == '荤菜') {
                hun.push(meal[i])
              }
              else if (meal[i].category == '其他') {
                qita.push(meal[i])
              }
            }
            that.setData({
              goods: meal,
              su: su,
              hun: hun,
              qita: qita,
              grade: 3,
              discount: res.data.discount,
              orderId: res.data.data.orderId,
              isReplace,
              cmonth,
              cday,
              omonth,
              oday,
              ohour
            })
            that.yyb2()
          }
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + 'index/listGoods',
        method: 'get',
        header: {
          'token': session,
          'content-type': 'application/json'  // 默认值
        },
        success(res) {
          let goods = res.data.goods
          let su = []
          let hun = []
          let qita = []
          //菜分类
          for (let i = 0; i < goods.length; i++) {
            if (goods[i].category == '素菜') {
              su.push(goods[i])
            }
            else if (goods[i].category == '荤菜') {
              hun.push(goods[i])
            }
            else if (goods[i].category == '其他') {
              qita.push(goods[i])
            }
          }
          that.setData({
            goods: goods,
            su: su,
            hun: hun,
            qita: qita,
            grade: 2,
            discount: res.data.discount
          })
          that.yyb1()

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  yyb1() {
    let that = this
    let yyb = []
    let goods = that.data.goods
    let energy = 0
    let protein = 0
    let fat = 0
    let carbohydrate = 0
    let dietaryFiber = 0
    let vitaminC = 0
    let vitaminE = 0
    let vitaminA = 0
    let firstB = 0
    let secondB = 0
    let thirdB = 0
    let calcium = 0
    let potassium = 0
    let iron = 0
    let magnesium = 0
    let zinc = 0
    let selenium = 0
    let sodium = 0
    for (let j = 0; j < goods.length; j++) {
      let list = goods[j].lifeNutritionEntity
      if (list == undefined) {
        energy += 0
        protein += 0
        fat += 0
        carbohydrate += 0
        dietaryFiber += 0
        vitaminC += 0
        vitaminE += 0
        vitaminA += 0
        firstB += 0
        secondB += 0
        thirdB += 0
        calcium += 0
        potassium += 0
        iron += 0
        magnesium += 0
        zinc += 0
        selenium += 0
        sodium += 0
      }
      else {
        energy += list.energy
        protein += list.protein
        fat += list.fat
        carbohydrate += list.carbohydrate
        dietaryFiber += list.dietaryFiber
        vitaminC += list.vitaminC
        vitaminE += list.vitaminE
        vitaminA += list.vitaminA
        firstB += list.firstB
        secondB += list.secondB
        thirdB += list.thirdB
        calcium += list.calcium
        potassium += list.potassium
        iron += list.iron
        magnesium += list.magnesium
        zinc += list.zinc
        selenium += list.selenium
        sodium += list.sodium
      }
    }
    yyb.push(energy)
    yyb.push(protein)
    yyb.push(fat)
    yyb.push(carbohydrate)
    yyb.push(dietaryFiber)
    yyb.push(vitaminC)
    yyb.push(vitaminE)
    yyb.push(vitaminA)
    yyb.push(firstB)
    yyb.push(secondB)
    yyb.push(thirdB)
    yyb.push(calcium)
    yyb.push(potassium)
    yyb.push(iron)
    yyb.push(magnesium)
    yyb.push(zinc)
    yyb.push(selenium)
    yyb.push(sodium)
    that.setData({
      yyb: yyb,
    })
  },
  yyb2() {
    let that = this
    let yyb = []
    let meal = that.data.goods
    let energy = 0
    let protein = 0
    let fat = 0
    let carbohydrate = 0
    let dietaryFiber = 0
    let vitaminC = 0
    let vitaminE = 0
    let vitaminA = 0
    let firstB = 0
    let secondB = 0
    let thirdB = 0
    let calcium = 0
    let potassium = 0
    let iron = 0
    let magnesium = 0
    let zinc = 0
    let selenium = 0
    let sodium=0
    for (let j = 0; j < meal.length; j++) {
      let list = meal[j].lifeNutritionEntity
      if (list == undefined) {
        energy += 0
        protein += 0
        fat += 0
        carbohydrate += 0
        dietaryFiber += 0
        vitaminC += 0
        vitaminE += 0
        vitaminA += 0
        firstB += 0
        secondB += 0
        thirdB += 0
        calcium += 0
        potassium += 0
        iron += 0
        magnesium += 0
        zinc += 0
        selenium += 0
        sodium += 0
      }
      else{
        energy += list.energy
        protein += list.protein
        fat += list.fat
        carbohydrate += list.carbohydrate
        dietaryFiber += list.dietaryFiber
        vitaminC += list.vitaminC
        vitaminE += list.vitaminE
        vitaminA += list.vitaminA
        firstB += list.firstB
        secondB += list.secondB
        thirdB += list.thirdB
        calcium += list.calcium
        potassium += list.potassium
        iron += list.iron
        magnesium += list.magnesium
        zinc += list.zinc
        selenium += list.selenium
        sodium += list.sodium
      }
    }
    yyb.push(energy)
    yyb.push(protein)
    yyb.push(fat)
    yyb.push(carbohydrate)
    yyb.push(dietaryFiber)
    yyb.push(vitaminC)
    yyb.push(vitaminE)
    yyb.push(vitaminA)
    yyb.push(firstB)
    yyb.push(secondB)
    yyb.push(thirdB)
    yyb.push(calcium)
    yyb.push(potassium)
    yyb.push(iron)
    yyb.push(magnesium)
    yyb.push(zinc)
    yyb.push(selenium)
    yyb.push(sodium)
    that.setData({
      yyb: yyb,
    })
  },
  minus(e) {
    // 获取点击的索引
    var that = this
    const goodsId = e.currentTarget.dataset.goodsid;
    const skuId = e.currentTarget.dataset.skuid;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/addShoppingCart',
      method: 'post',
      data: {
        goodsId: goodsId,
        cartState: 1,
        skuId: skuId,
        goodsSize: -1,
      },
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        that.foodload()
        that.gouwulan()
      }
    })
  },
  add(e) {
    // 获取点击的索引
    var that = this
    const goodsId = e.currentTarget.dataset.goodsid;
    const skuId = e.currentTarget.dataset.skuid;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/addShoppingCart',
      method: 'post',
      data: {
        goodsId: goodsId,
        cartState: 1,
        skuId: skuId,
        goodsSize: 1,
      },
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        that.foodload()
        that.gouwulan()
      }
    })
  },
  create(e) {
    // 获取点击的索引
    var that = this
    const goodsId = e.currentTarget.dataset.goodsid;
    const skuId = e.currentTarget.dataset.skuid;
    const session = wx.getStorageSync('session')
    wx.request({
      url: app.globalData.url + 'shoppingCart/addShoppingCart',
      method: 'post',
      data: {
        goodsId: goodsId,
        cartState: 1,
        skuId: skuId,
        goodsSize: 1,
      },
      header: {
        'token': session,
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      success(res) {
        that.foodload()
        that.gouwulan()
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
    var that = this
    that.gouwulan()
    that.foodload()
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