const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = (app) => {
//   app.use(createProxyMiddleware('/api', {
//     target: 'http://127.0.0.1:6000',
//   }));
// };

module.exports = (app) => {
  app.use(createProxyMiddleware('/api', {
    target: 'http://211.159.150.3',
  }));
};
