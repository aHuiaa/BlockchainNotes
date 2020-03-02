//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    authorized: false,
    userInfo: null,
    address:null,
    contractAddress:null,
    date:null,
    noteList:null,
    dateList:null,
    // arry_data:[],
  },
  
  onLoad: function () {
    // wx.showLoading({
    //   title: '正在初始化'
    // });
    this.data.address = wx.getStorageSync('address');
    this.data.contractAddress = wx.getStorageSync('contractAddress');
    this.getNowFormatDate();
    this.userAuthorized();
  },
  onPullDownRefresh: function () {
    this.getNowFormatDate();
  },
  getNowFormatDate:function(){
    var that = this;
    wx.showToast({
      title: "正在加载",
      icon: 'loading',
      duration: 99999999
    })
    wx.request({
      url: app.globalData.api + 'getNowFormatDate',
      success:function(res){
        console.log("获取到的时间是：" + res.data);
        that.data.date = res.data;
        that.setData({
          date: res.data
        })
        that.getNoteList();
      }
    })  
  },

  //获取30天笔记列表
  getNoteList:function(){
    var that = this;
    console.log("获取笔记列表："+that.data.address);
    console.log(that.data.contractAddress);
    console.log(that.data.date);
    wx.hideLoading();
    wx.request({
      url: app.globalData.api+'getNoteList',
      data: {
        count: 2,
        address: that.data.address,
        contractAddress:that.data.contractAddress,
        date:app.getNowFormatDate(new Date())
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'Authorization': 'APPCODE b761f54f357b47aebab49aa90a12d766'
      },
      success: function (res) {
        wx.hideToast();
        wx.stopPullDownRefresh();//停止当前页面的下拉刷新
        console.log(res.data.result);
        // result = JSON.parse(res.data)
        that.setData({
          noteList: res.data.result
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
