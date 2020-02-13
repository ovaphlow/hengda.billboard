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
  }
}

module.exports = config