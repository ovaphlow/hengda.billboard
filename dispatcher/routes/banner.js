const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');
const console = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/banner.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).banner;

const grpcClient = new proto.Banner(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/banner',
});

module.exports = router;

router.get('/detail/:id/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.detail(body, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.data));
      }
    });
  });
  try {
    ctx.params.uuid = ctx.query.uuid;
    ctx.response.body = await grpcFetch(ctx.params);
  } catch (err) {
    console.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
router.get('/:category/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
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
    ctx.response.body = await grpcFetch(ctx.params);
  } catch (err) {
    console.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
