//index.js
const app = getApp()

Page({
  data: {
    url: 'https://www.longzhaopin.com/wx/?ver=2.0.16/#/'
  },

  onLoad: function (options) {
    options.url ? this.setData({ url: decodeURIComponent(options.url) }) : this.setData({ url: options.url });
  },

  onShareAppMessage: function (options) {
    return {
      title: '龙江学子就业平台',
      path: '/pages/index/index?url=' + encodeURIComponent(options.webViewUrl),
    }
  }
});