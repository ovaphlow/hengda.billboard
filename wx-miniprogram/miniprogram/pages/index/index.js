//index.js
const app = getApp()

Page({
  onShareAppMessage: function () {
    return {
      title: '龙江学子就业平台',
      path: 'pages/index/index',
    }
  }
});