const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const config = require('../config');
const logger = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/recruitment.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).recruitment;

const grpcClient = new proto.Recruitment(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/recruitment',
});

module.exports = router;

router.get('/job-fair/ent/:job_fair_id/:ent_id', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.jobFairEntList(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch({
      ...ctx.params,
      ent_uuid: ctx.query.ent_uuid,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/job-fair/:job_fair_id', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.jobFairList(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch(ctx.params);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/subject/:subject', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.subject(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch(ctx.params);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/search/', async (ctx) => {
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
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/keyword-search/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.keywordSearch(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/enterprise/:id/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.enterpriseList(body, (err, response) => {
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

router.put('/enterprise/:id/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.enterpriseSearch(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.request.body.enterprise_id = ctx.params.id;
    ctx.request.body.uuid = ctx.query.u_id;
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/status/:id/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.status(body, (err, response) => {
        if (err) {
          logger.error(err);
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
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/:id/', async (ctx) => {
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

router.put('/:id/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.update(body, (err, response) => {
        if (err) {
          logger.error(err);
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
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/', async (ctx) => {
  const grpcFetch = () =>
    new Promise((resolve, reject) => {
      grpcClient.list({ data: JSON.stringify({}) }, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch();
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

/**
 * 2020-11-09
 * 用于小程序首页，按类别检索功能。
 * url 参数：?category=@PARAM
 */
router.put('/', async (ctx) => {
  const enums = ['byCategory'];
  const category = ctx.request.query.category || '';
  if (enums.indexOf(category) === -1) {
    ctx.response.body = [];
    return;
  }
  const gfetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.filter(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(response.data);
        }
      });
    });
  try {
    ctx.response.body = await gfetch({
      category,
      filter: ctx.request.body,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
  }
});

router.post('/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.insert(body, (err, response) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
