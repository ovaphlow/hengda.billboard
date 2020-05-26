const os = require('os')

const config = {
  env: 'development',
  app: {
    port: 6000,
    numChildProcesses: os.cpus().length
  },
  grpcServer: {
    host: '127.0.0.1',
    port: '5001'
  },
  email: {
    service: 'qq',
    auth: {
      user: '13945179610@qq.com',
      pass: '1004zbz87139186'
    }
  }
}

module.exports = config