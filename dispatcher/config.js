const os = require('os');

const config = {
  env: 'production',
  app: {
    port: 6000,
    numChildProcesses: os.cpus().length,
  },
  grpcServer: {
    host: '127.0.0.1',
    port: '5001',
  },
  email: {
    service: 'qq',
    auth: {
      user: 'longzhaopin@foxmail.com',
      pass: 'djtkwgcgtbknjhbh',
    },
  },
  wx: {
    appid: 'wx79586a354703320a',
    appSecret: '53b1e116cfb28e1626d1c76ea484b05b',
    getTokenApi:
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&',
    getTicketApi:
      'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=TOKEN&type=jsapi',
  },
};

module.exports = config;
