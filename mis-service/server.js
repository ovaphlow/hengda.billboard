const cluster = require('cluster')
const http = require('http')

const app = require('./app')
const config = require('./config')

if (cluster.isMaster) {
  console.log(`${new Date()} 主进程 PID:${process.pid}`)

  for (let i = 0; i < config.app.numChildProcesses; i++) {
    cluster.fork()
  }

  cluster.on('online', worker => {
    console.log(`${new Date()} 子进程 PID:${worker.process.pid}, 端口:${config.app.port}`)
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(`${new Date()} 子进程 PID:${worker.process.pid}终止，错误代码:${code}，信号:${signal}`)
    console.log(`${new Date()} 由主进程(PID:${process.pid})创建新的子进程`)
    cluster.fork()
  })
} else {
  http.createServer(app.callback()).listen(config.app.port)
}
