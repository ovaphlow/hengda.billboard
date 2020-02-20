const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/journal.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
).journal

const grpcClient = new proto.Journal(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/journal'
})

module.exports = router

router.get('/edit/:category/:id/', async ctx => {
  const grpcFetch = body => new Promise((resolve, reject) =>
    grpcClient.editList({ data: JSON.stringify(body) }, (err, response) => {
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

router
  .get('/:common_user_id/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.list({ data: JSON.stringify(body) }, (err, response) => {
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
  .get('/:common_user_id/:data_id/:category/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.get({ data: JSON.stringify(body) }, (err, response) => {
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
  .post('/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.insert({ data: JSON.stringify(body) }, (err, response) => {
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
  .delete('/:common_user_id/:data_id/:category/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.delete({ data: JSON.stringify(body) }, (err, response) => {
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

