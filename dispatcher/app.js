const cluster = require('cluster');
const http = require('http');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const logger = require('./logger');

const app = new Koa();

app.env = config.env;

app.use(
  bodyParser({
    jsonLimit: '8mb',
  }),
);

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

(() => {
  const router = require('./route/enterpriseUser');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/commonUser');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/commonUserFile');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/resume');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/banner');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/recruitment');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/journal');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/favorite');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/delivery');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/report');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/feedback');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/message');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/enterprise');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/offer');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/topic');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/campus');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/commonUserSchedule');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/commonData');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/recommend');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/email');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/chart');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./route/job-fair');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

module.exports = app;

if (require.main === module) {
  if (cluster.isMaster) {
    logger.log(`${new Date()} 主进程 PID:${process.pid}`);

    for (let i = 0; i < config.app.numChildProcesses; i += 1) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      logger.log(
        `${new Date()} 子进程 PID:${worker.process.pid}, 端口:${
          config.app.port
        }`,
      );
    });

    cluster.on('exit', (worker, code, signal) => {
      logger.log(
        `${new Date()} 子进程 PID:${
          worker.process.pid
        }终止，错误代码:${code}，信号:${signal}`,
      );
      logger.log(`${new Date()} 由主进程(PID:${process.pid})创建新的子进程`);
      cluster.fork();
    });
  } else {
    http.createServer(app.callback()).listen(config.app.port);
  }
}
