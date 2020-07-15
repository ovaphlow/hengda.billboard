// const proxy = require('http-proxy-middleware')

// module.exports = app => {
//   app.use(proxy('/api', {
//     target: 'http://192.168.1.245:6000'
//   }))
// }

const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/api', {
    target: 'http://211.159.150.3'
  }))
}