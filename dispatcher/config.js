const os = require('os')

const config = {
  env: 'development',
  app: {
    port: 6000,
    numChildProcesses: os.cpus().length
  }
}

module.exports = config