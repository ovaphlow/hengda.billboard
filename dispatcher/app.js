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
