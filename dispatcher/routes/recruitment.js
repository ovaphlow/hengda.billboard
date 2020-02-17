const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/recruitment.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
).recruitment

const grpcClient = new proto.Recruitment(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)



const router = new Router({
  prefix: '/api/recruitment'
})

module.exports = router

router.get('/', async ctx => {
  const grpcFetch = () => new Promise((resolve, reject) =>
    grpcClient.list({ data: JSON.stringify({}) }, (err, response) => {
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

router.get('/:id', async ctx => {
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