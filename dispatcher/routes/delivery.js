const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/delivery.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).delivery;

const grpcClient = new proto.Delivery(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/delivery',
});

module.exports = router;

router
  .get('/:id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.get(body, (err, response) => {
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
  .get('/recruitment/:recruitment_id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.recruitmentList(body, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.data));
      }
    }));
    try {
      ctx.params.recruitment_uuid = ctx.query.recruitment_uuid;
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .get('/user/:common_user_id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.userDeliveryList(body, (err, response) => {
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
  .get('/details/:id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.details(body, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.data));
      }
    }));
    try {
      ctx.params.uuid = ctx.query.u_id;
      ctx.params.user_id = ctx.query.u_i;
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .get('/:common_user_id/:recruitment_id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.userDelivery(body, (err, response) => {
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
  })
  .put('/search/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.search(body, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(response.data));
      }
    }));
    try {
      ctx.request.body.uuid = ctx.query.u_id;
      console.info(ctx.request.body);
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .put('/status/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => grpcClient.status(body, (err, response) => {
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
