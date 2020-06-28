const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/commonData.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
).commonData

const grpcClient = new proto.CommonData(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)


const router = new Router({
  prefix: '/api/common-data'
})

module.exports = router



router
  .get('/hangye/', async ctx => {
    const grpcFetch = () => new Promise((resolve, reject) =>
      grpcClient.hangye({ data: JSON.stringify({}) }, (err, response) => {
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
      ctx.response.body = await grpcFetch()
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })