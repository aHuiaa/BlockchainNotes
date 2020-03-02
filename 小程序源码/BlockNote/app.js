//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        if (code) { 
           console.log('获取用户登录凭证：' + code); 
        // ------ 发送凭证 ------ 
          wx.request({
            url: that.globalData.api + 'code2Session', 
        data: { 
          code: code 
          }, 
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded'}, 
          dataType:'json',
          success: function (res1) { 
            console.log(res1)
            if (res1.statusCode == 200) { 
            //把res1.data字符串转换成json对象
              res1.data = JSON.parse(res1.data)
            console.log("获取到的openid为：" + res1.data.openid) 
      
            that.globalData.openid = res1.data.openid;
            

              //创建账户
              // that.createAccount();
            var a = wx.getStorageSync('openid');
            if (a != that.globalData.openid){  
              that.createAccount();
            }
            } else { 
              console.log(res.errMsg) 
              } 

              },
              }) 
               } else { console.log('获取用户登录失败：' + res.errMsg); }
              
             }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

//创建账号
  createAccount: function () {
    var that = this;
    wx.setStorageSync('openid', that.globalData.openid);
    var a = '666';
    a = that.globalData.openid;
    console.log("1这里的openid是：" + that.globalData.openid);
    that.showLoading(1000);
    wx.request({
      // url: app.globalData.api+'createAccount',
      url: that.globalData.api + 'createAccount',
      data: {
        openid: a
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'Authorization': 'APPCODE b761f54f357b47aebab49aa90a12d766'
      },
      success: function (res) {
        console.log(res);
        that.globalData.address = res.data;
        console.log("1这里的dizhi是：" + that.globalData.address);
        setTimeout(function () {
          console.log('部署合约中')
          that.deployContract();
        }, 15000);
        wx.setStorageSync('address', res.data);
      }
    })
  },

//发布合约
  deployContract: function () {
    var that = this;
    console.log("3这里的dizhi是：" + that.globalData.address);
    if (that.globalData.address==null){
      that.globalData.address = wx.getStorageSync('address');
    }
    console.log("3-1这里的dizhi是：" + that.globalData.address);
    that.showLoading(1000);
    wx.request({
      url: that.globalData.api + 'deployContract',
      method: 'post',
      data: {
        address: that.globalData.address,
        openid: that.globalData.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值 
      },
      success: function (res) {
        var b = res.data;
        console.log("这里是返回的合约地址:" + b);
        wx.setStorageSync('contractAddress', b);
        wx.hideLoading();

      }
    })

  },


  showLoading: function (time = 1500) {
    wx.showLoading({
      title: '请稍后...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, time)
  },
  showModal: function (content) {
    wx.showModal({
      title: '提示',
      content: content,
    })
  },
  globalData: {
    userInfo: null,
    api: 'http://localhost:5555/',
    address:null,
    openid:null,
    // code:null,
  },
  getNowFormatDate:function (date) {
    var date = new Date();
    var preDtae = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
  month = "0" + month;
}
if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
}
var currentdate = year + seperator1 + month + seperator1 + strDate;
console.log(currentdate);
return currentdate;
}
})