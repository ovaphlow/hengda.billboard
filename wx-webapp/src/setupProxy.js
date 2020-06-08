const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/api', {
    target: 'http://127.0.0.1:6000'
  }))
}

// const proxy = require('http-proxy-middleware')

// module.exports = app => {
//   app.use(proxy('/api', {
//     target: 'http://211.159.150.3'
//   }))
// }