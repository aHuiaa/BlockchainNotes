// pages/shequ/shequ.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorized: false,
    userInfo: null,
    topiclist:null,
    // arry_data:[],
  },

  onLoad: function () {
    // wx.showLoading({
    //   title: '正在初始化'
    // });
    this.query();
  },
  onPullDownRefresh: function () {
    this.query();
  },

  //获取社区话题列表
  query: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + 'query',
      success: function (res) {
        wx.hideToast();
        wx.stopPullDownRefresh();//停止当前页面的下拉刷新
        console.log(res.data);
        that.setData({
          topiclist: res.data
        })
      },

    })
  },

  //  判断是否用户授权
  userAuthorized(event) {
    //查看是否授权
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          //  已经授权可以直接调用getUserInfo获取用户信息
          wx.getUserInfo({
            success: data => {
              app.globalData.userInfo = data.userInfo; // 能不能实现为全局变量赋值？？       
              this.setData({
                userInfo: data.userInfo,
                authorized: true,
              })
            }
          })
        } else {
          console.log('err');
        }
      }
    })
  },
  //  获取用户信息（以对象形式保存）
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    app.globalData.api = event.detail.api;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
      })
    }
  }
})
