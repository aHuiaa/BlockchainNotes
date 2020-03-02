// pages/topicdetail/topicdetail.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    topic:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id);
    that.setData({
      id: options.id,
    });
    that.gettopic();
  },

//获取社区话题详情
  gettopic: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + 'gettopic',
      data: {      
        id: that.data.id,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'Authorization': 'APPCODE b761f54f357b47aebab49aa90a12d766'
      },
      success: function (res) {
        console.log("单个话题"+res.data[0].id);
        that.setData({
          topic: res.data[0]
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