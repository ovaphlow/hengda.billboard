const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(createProxyMiddleware('/api', {
    target: 'http://211.159.150.3:6000'
  }))
}