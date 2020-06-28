const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/resume.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
).resume

const grpcClient = new proto.Resume(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/resume'
})

module.exports = router

router
  .get('/:id/', async ctx => {
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
      ctx.params.uuid = ctx.query.u_id
      ctx.params.user_id = ctx.query.u_i
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })
  .get('/user/:common_user_id/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.user(body, (err, response) => {
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
      ctx.params.uuid = ctx.query.u_id
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })
  .put('/retrieval/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.retrieval(body, (err, response) => {
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
  .put('/recommend/', async ctx =>{
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.recommend(body, (err, response) => {
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
  .put('/:common_user_id/', async ctx => {
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
      ctx.request.body.uuid = ctx.query.u_id
      ctx.request.body.common_user_id = ctx.params.common_user_id
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })

router.post('/status/:id/', async ctx => {
  const grpcFetch = body => new Promise((resolve, reject) =>
    grpcClient.status(body, (err, response) => {
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
    ctx.request.body.id = ctx.params.id
    ctx.request.body.uuid = ctx.query.u_id
    ctx.response.body = await grpcFetch(ctx.request.body)
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})


router.post('/init/', async ctx => {
  const grpcFetch = body => new Promise((resolve, reject) =>
    grpcClient.init(body, (err, response) => {
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
    ctx.request.body.uuid = ctx.query.u_id
    ctx.response.body = await grpcFetch(ctx.request.body)
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})


