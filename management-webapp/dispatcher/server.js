const cluster = require('cluster');
const http = require('http');
const os = require('os');

const app = require('./app');
const logger = require('./logger');

const port = 5000;

if (cluster.isMaster) {
  logger.log(`${new Date()} 主进程 PID:${process.pid}`);

  for (let i = 0; i < os.cpus().length; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.log(`${new Date()} 子进程 PID:${worker.process.pid}, 端口:${port}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.log(`${new Date()} 子进程 PID:${worker.process.pid}终止，错误代码:${code}，信号:${signal}`);
    logger.log(`${new Date()} 由主进程(PID:${process.pid})创建新的子进程`);
    cluster.fork();
  });
} else {
  http.createServer(app.callback()).listen(port);
}
