const Router = require('@koa/router')
const grpc = require('grpc')
const crypto = require('crypto')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/commonUser.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
).commonUser

const grpcClient = new proto.CommonUser(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)


const router = new Router({
  prefix: '/api/common-user'
})

module.exports = router

router
  .post('/sign-in', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.signIn(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      const salt = crypto.randomBytes(8).toString('hex')
      const hmac = crypto.createHmac('sha256', salt)
      hmac.update(ctx.request.body.password)
      const password_salted = hmac.digest('hex')
      ctx.response.body = await grpcFetch({
        ...ctx.request.body,
        password: password_salted,
        salt
      })
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })

router
  .post('/log-in/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.logIn(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      const result = await grpcFetch(ctx.request.body)
      if (result.message) {
        ctx.response.body = result
      } else {
        const hmac = crypto.createHmac('sha256', result.content.salt)
        hmac.update(ctx.request.body.password)
        const password_salted = hmac.digest('hex')
        if (password_salted !== result.content.password) {
          ctx.response.body = { message: '用户名或密码错误', content: '' };
        } else {
          result.content.salt = undefined
          result.content.password = undefined
          ctx.response.body = result
        }
      }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })

router
  .put('/recover/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.recover(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      const salt = crypto.randomBytes(8).toString('hex')
      const hmac = crypto.createHmac('sha256', salt)
      hmac.update(ctx.request.body.password)
      const password_salted = hmac.digest('hex')
      ctx.response.body = await grpcFetch({
        ...ctx.request.body,
        password: password_salted,
        salt
      })
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })


router
  .put('/checkEmail/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.checkEmail(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })


router
  .put('/checkRecover/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.checkRecover(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })


router
  .get('/:id', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.get(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })
  .put('/phone', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.phone(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })
  .put('/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.update(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })
  .get('/journal/:user_id/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.journal(body, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        } else {
          resolve(JSON.parse(response.data))
        }
      })
    )
    try {
      ctx.params.category = '个人用户'
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })