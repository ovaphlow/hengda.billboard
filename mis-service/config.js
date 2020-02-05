const os = require('os')

const config = {
  env: 'development',
  app: {
    port: 5000,
    numChildProcesses: os.cpus().length
  },
  mysql: {
    username: 'root',
    password: 'ovaph@CDT.1123',
    host: '127.0.0.1',
    prot: 3306,
    database: 'hengda-billboard',
    pool: {
      size: os.cpus().length
    }
  }
}

module.exports = config