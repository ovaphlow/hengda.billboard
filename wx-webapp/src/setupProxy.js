const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/api', {
    target: 'http://39.102.80.159:801'
  }))
}