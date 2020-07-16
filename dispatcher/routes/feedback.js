const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/feedback.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).feedback;

const grpcClient = new proto.Feedback(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/feedback',
});

module.exports = router;

router
  .get('/:user_category/:user_id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.list(body, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.data));
      }
    }));
    try {
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .post('/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.insert(body, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.data));
      }
    }));
    try {
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  });
