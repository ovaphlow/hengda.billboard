const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/chart.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
).chart

const grpcClient = new proto.Chart(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/chart'
})

module.exports = router

router.get('/ent-home/', async ctx => {
  const grpcFetch = body => new Promise((resolve, reject) =>
    grpcClient.entHome(body, (err, response) => {
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