const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');
const grpc = require('grpc');

const config = require('../config');
const logger = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/campus.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).campus;

const grpcClient = new proto.Campus(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/campus',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.get(body, (err, response) => {
        if (err) {
          logger.error(err);
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
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.search(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch({ filter: ctx.request.body });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
