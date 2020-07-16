const os = require('os');

const config = {
  env: 'development',
  app: {
    port: 6000,
    numChildProcesses: os.cpus().length,
  },
  grpcServer: {
    host: '127.0.0.1',
    port: '5001',
  },
  email: {
    service: '163',
    auth: {
      user: 'qiangxiazhanling@163.com',
      pass: 'RWWFGNCNCPQXVOXC',
    },
  },
};

module.exports = config;
