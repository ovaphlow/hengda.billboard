const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');
const console = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/enterprise.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).enterprise;

const grpcClient = new proto.Enterprise(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/enterprise',
});

module.exports = router;

router
  .get('/subject/:name/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.subject(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      ctx.request.body.name = ctx.params.name;
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .get('/job-fair/:job_fair_id/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.JobFairList(body, (err, response) => {
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
  })
  .get('/check/:id', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.check(body, (err, response) => {
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
  })

  .put('/:id/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.update(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      ctx.request.body.id = ctx.params.id;
      ctx.request.body.uuid = ctx.query.u_id;
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  });
