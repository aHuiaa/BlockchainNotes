// pages/detail/detail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    note:null,
    date:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("????" + options.date);
    that.setData({
      id: options.id,
      date: options.date,
    });
    console.log(that.data.id);
    console.log("????" + options.date);
    that.getNote();
  },


  getNote:function(){
    var that = this;
    wx.request({
      url: app.globalData.api +'getNote',
      data:{
        date: that.data.date,
        address: wx.getStorageSync('address'),
        id :that.data.id,
        contractAddress: wx.getStorageSync('contractAddress'),
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'Authorization': 'APPCODE b761f54f357b47aebab49aa90a12d766'
      },
      success: function (res) {
        console.log(res.data.result);
        that.setData({
          note: res.data.result
        })
      },
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