// pages/addNote/addNote.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    contractAddress: null,
  },
  submit: function (event) {
    // 获取云笔记的标题
    var title = event.detail.value.title;
    // 获取云笔记的简介
    var intro = event.detail.value.intro;
    var that = this;
    // 获取云笔记的内容
    var content = event.detail.value.content;

    // 云笔记的内容和名称不能为空，否则不会提交
    if (content.length == 0 || title.length == 0 || intro.length == 0) {
      app.showModal('输入信息不完整！');
    } else {
      wx.showLoading({
        title: '正在将笔记加入区块'
      });
      // 显示进度

      // 请求服务端的addNote路由，并提交相应的数据
      console.log(app.globalData.api);
      console.log(app.globalData.openid);
      console.log(that.data.address);
      console.log(that.data.contractAddress);
      // console.log(app.globalDatsa.address);
      wx.request({
        // url: app.globalData.api+'addNote',
        url: app.globalData.api + 'createNote',
        data: {
          address: that.data.address,
          openid: app.globalData.openid,
          title: title,
          intro: intro,
          content: content,
          contractAddress: that.data.contractAddress,
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
          // 'Authorization': 'APPCODE b761f54f357b47aebab49aa90a12d766'
        },
        success: (res) => {
          // 如果提交成功，完成下面的工作
          console.log(res);
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '添加成功！是否返回首页？',
            success: function (res) {
              wx.reLaunch({
                url: "/pages/index/index"
              })
            }
          })

        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var value1 = wx.getStorageSync('address');
    that.data.address = value1;
    var value2 = wx.getStorageSync('contractAddress');
    that.data.contractAddress = value2;
    that.setData({
      address: value1,
      contractAddress: value2
      //"调用setData（）修改后的值"
    })
    console.log("address:" + value1);
    console.log("contractAddress:" + value2);
    // const res = wx.getStorageInfoSync();
    // console.log("key"+res.keys);
    // console.log("currentSize"+res.currentSize);
    // console.log("limitSize"+res.limitSize);
    console.log("11" + app.globalData.api);
    console.log("13" + app.globalData.openid);
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