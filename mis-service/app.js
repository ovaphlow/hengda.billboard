const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const logger = require('./logger');

const routerContent = require('./routes/content');
const routerMisUser = require('./routes/mis-user');
const routerEnterprise = require('./routes/enterprise');
const routerEnterpriseUser = require('./routes/enterprise-user');
const routerRecruitment = require('./routes/recruitment');
const routerCommonUser = require('./routes/common-user');
const routerResume = require('./routes/resume');
const routerDelivery = require('./routes/delivery');
const routerFavorite = require('./routes/favorite');
const routerJournal = require('./routes/journal');
const routerFeedback = require('./routes/feedback');
const routerReport = require('./routes/report');
const routerSettings = require('./routes/settings');
const routerCurrentUser = require('./routes/current-user');
const routerStats = require('./routes/stats');

const app = new Koa();

app.env = 'production';

app.use(bodyParser());

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
  app.use(routerSettings.routes());
  app.use(routerSettings.allowedMethods());
})();

(() => {
  app.use(routerCurrentUser.routes());
  app.use(routerCurrentUser.allowedMethods());
})();

(() => {
  app.use(routerStats.routes());
  app.use(routerStats.allowedMethods());
})();

module.exports = app;
