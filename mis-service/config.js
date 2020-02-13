const os = require('os')

const config = {
  env: 'development',
  app: {
    port: 5000,
    numChildProcesses: os.cpus().length
  },
  mysql: {
    username: 'ovaphlow',
    password: 'ovaph@CDT.1123',
    host: '211.159.150.3',
    prot: 3306,
    database: 'hengda-billboard',
    pool: {
      size: os.cpus().length
    }
  }
}

module.exports = config