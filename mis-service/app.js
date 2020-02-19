const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const config = require('./config')

const app = new Koa()

app.env = config.env

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

function initMISUserRouter() {
  const router = require('./routes/mis-user')
  app.use(router.routes())
  app.use(router.allowedMethods())
}
initMISUserRouter()

function initEnterpriseRouter() {
  const router = require('./routes/enterprise')
  app.use(router.routes())
  app.use(router.allowedMethods())
}
initEnterpriseRouter()

function initCommonUserRouter() {
  const router = require('./routes/common-user')
  app.use(router.routes())
  app.use(router.allowedMethods())
}
initCommonUserRouter()

function initFeedbackRouter() {
  const router = require('./routes/feedback')
  app.use(router.routes())
  app.use(router.allowedMethods())
}
initFeedbackRouter()

module.exports = app