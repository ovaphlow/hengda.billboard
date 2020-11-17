const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');
const console = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/topic.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).topic;

const grpcClient = new proto.Topic(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/topic',
});

module.exports = router;

router
  .get('/common/', async (ctx) => {
    const grpcFetch = () =>
      new Promise((resolve, reject) => {
        grpcClient.common({ data: JSON.stringify({}) }, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .get('/ent/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.ent(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .get('/:id', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.get(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      ctx.params.uuid = ctx.query.u_id;
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  });
