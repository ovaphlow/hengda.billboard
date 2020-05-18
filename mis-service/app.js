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

;(() => {
  const router = require('./routes/content')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/mis-user')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/enterprise')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/enterprise-user')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/recruitment')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/common-user')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/resume')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/delivery')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/favorite')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/journal')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/feedback')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/report')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/settings')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/current-user')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

;(() => {
  const router = require('./routes/stats')
  app.use(router.routes())
  app.use(router.allowedMethods())
})()

module.exports = app
