const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(createProxyMiddleware('/api', {
    target: 'http://192.168.1.225:6000'
  }))
}