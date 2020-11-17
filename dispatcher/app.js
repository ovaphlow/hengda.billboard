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
  const router = require('./routes/enterpriseUser');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/commonUser');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/commonUserFile');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/resume');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/banner');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/recruitment');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/journal');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/favorite');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/delivery');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/report');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/feedback');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/message');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/enterprise');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/offer');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/topic');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/campus');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/commonUserSchedule');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/commonData');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/recommend');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/email');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/chart');
  app.use(router.routes());
  app.use(router.allowedMethods());
})();

(() => {
  const router = require('./routes/job-fair');
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
