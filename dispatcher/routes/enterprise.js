const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')


const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/enterprise.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
).enterprise

const grpcClient = new proto.Enterprise(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/enterprise'
})

module.exports = router

router
.get('/:id/', async ctx => {
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