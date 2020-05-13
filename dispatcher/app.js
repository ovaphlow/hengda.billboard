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

function EnterpriseUserRouter() {
  const router = require('./routes/enterpriseUser')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

EnterpriseUserRouter()


function commonUserRouter() {
  const router = require('./routes/commonUser')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

commonUserRouter()

function commonUserFileRouter() {
  const router = require('./routes/commonUserFile')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

commonUserFileRouter()

function resumeRouter() {
  const router = require('./routes/resume')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

resumeRouter()

function bannerRouter() {
  const router = require('./routes/banner')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

bannerRouter()

function recruitmentRouter() {
  const router = require('./routes/recruitment')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

recruitmentRouter()

function journalRouter() {
  const router = require('./routes/journal')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

journalRouter()

function favoriteRouter() {
  const router = require('./routes/favorite')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

favoriteRouter()

function deliveryRouter() {
  const router = require('./routes/delivery')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

deliveryRouter()

function reportRouter() {
  const router = require('./routes/report')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

reportRouter()

function feedbackRouter() {
  const router = require('./routes/feedback')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

feedbackRouter()

function messageRouter() {
  const router = require('./routes/message')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

messageRouter()

function enterpriseRouter() {
  const router = require('./routes/enterprise')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

enterpriseRouter()

function offerRouter() {
  const router = require('./routes/offer')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

offerRouter()

function topicRouter() {
  const router = require('./routes/topic')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

topicRouter()

function campusRouter() {
  const router = require('./routes/campus')
  app.use(router.routes())
  app.use(router.allowedMethods())
}

campusRouter()

function commonUserScheduleRouter() {
  const router = require('./routes/commonUserSchedule')
  app.use(router.routes())
  app.use(router.allowedMethods())
} 

commonUserScheduleRouter()

function commonDataRouter() {
  const router = require('./routes/commonData')
  app.use(router.routes())
  app.use(router.allowedMethods())
} 

commonDataRouter()

function recommendRouter() {
  const router = require('./routes/recommend')
  app.use(router.routes())
  app.use(router.allowedMethods())
} 

recommendRouter()

function emailRouter() {
  const router = require('./routes/email')
  app.use(router.routes())
  app.use(router.allowedMethods())
} 

emailRouter()

function chartRouter() {
  const router = require('./routes/chart')
  app.use(router.routes())
  app.use(router.allowedMethods())
} 

chartRouter()

module.exports = app