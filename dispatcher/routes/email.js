const Router = require('@koa/router')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('../config')
const nodemailer = require('nodemailer');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../proto/email.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
).email

const grpcClient = new proto.Email(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)


const router = new Router({
  prefix: '/api/email'
})

module.exports = router

router
  .put('/check/', async ctx => {
    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.code(body, (err, response) => {
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
  .put('/', async ctx => {
    const code = parseInt(Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)).toString()
    const transporter = nodemailer.createTransport(config.email);
    const mailOptions = {
      from: config.email.auth.user,
      to: ctx.request.body.email,
      subject: `学子就业网邮箱验证`,
      html: `您的验证码是:<br/>
      <h1>${code}</h1>
    `
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.info(error)
      } else {
        console.info('发送邮件到' + ctx.request.body.email)
      }
    })

    const grpcFetch = body => new Promise((resolve, reject) =>
      grpcClient.insert(body, (err, response) => {
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
      ctx.response.body = await grpcFetch({
        ...ctx.request.body,
        code: code
      })
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误' }
    }
  })

