const path = require('path');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');

const logger = require('./logger');

const routerContent = require('./route/content');
const routerMisUser = require('./route/mis-user');
const routerEnterprise = require('./route/enterprise');
const routerEnterpriseUser = require('./route/enterprise-user');
const routerRecruitment = require('./route/recruitment');
const routerCommonUser = require('./route/common-user');
const routerResume = require('./route/resume');
const routerDelivery = require('./route/delivery');
const routerFavorite = require('./route/favorite');
const routerJournal = require('./route/journal');
const routerFeedback = require('./route/feedback');
const routerReport = require('./route/report');
const routerSetting = require('./route/setting');
const routerCurrentUser = require('./route/current-user');
const routerStats = require('./route/stats');
const routerBulletin = require('./route/bulletin');

const app = new Koa();

app.env = 'production';

app.use(bodyParser({
  jsonLimit: '8mb',
}));

const STATIC_PATH = path.join(__dirname, '../public');
app.use(staticCache(STATIC_PATH, {
  maxAge: 60 * 60 * 24 * 7,
  gzip: true,
}));

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

app.use(async (ctx, next) => {
  if (ctx.request.url === '/' && ctx.request.method === 'GET') {
    ctx.redirect('/index.html');
  } else {
    await next();
  }
});

(() => {
  app.use(routerContent.routes());
  app.use(routerContent.allowedMethods());
})();

(() => {
  app.use(routerMisUser.routes());
  app.use(routerMisUser.allowedMethods());
})();

(() => {
  app.use(routerEnterprise.routes());
  app.use(routerEnterprise.allowedMethods());
})();

(() => {
  app.use(routerEnterpriseUser.routes());
  app.use(routerEnterpriseUser.allowedMethods());
})();

(() => {
  app.use(routerRecruitment.routes());
  app.use(routerRecruitment.allowedMethods());
})();

(() => {
  app.use(routerCommonUser.routes());
  app.use(routerCommonUser.allowedMethods());
})();

(() => {
  app.use(routerResume.routes());
  app.use(routerResume.allowedMethods());
})();

(() => {
  app.use(routerDelivery.routes());
  app.use(routerDelivery.allowedMethods());
})();

(() => {
  app.use(routerFavorite.routes());
  app.use(routerFavorite.allowedMethods());
})();

(() => {
  app.use(routerJournal.routes());
  app.use(routerJournal.allowedMethods());
})();

(() => {
  app.use(routerFeedback.routes());
  app.use(routerFeedback.allowedMethods());
})();

(() => {
  app.use(routerReport.routes());
  app.use(routerReport.allowedMethods());
})();

(() => {
  app.use(routerSetting.routes());
  app.use(routerSetting.allowedMethods());
})();

(() => {
  app.use(routerCurrentUser.routes());
  app.use(routerCurrentUser.allowedMethods());
})();

(() => {
  app.use(routerStats.routes());
  app.use(routerStats.allowedMethods());
})();

(() => {
  app.use(routerBulletin.routes());
  app.use(routerBulletin.allowedMethods());
})();

module.exports = app;
