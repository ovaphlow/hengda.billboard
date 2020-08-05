const Router = require('@koa/router');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');
const console = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/message.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).message;

const grpcClient = new proto.Message(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/message',
});

module.exports = router;

router
  .get('/sys/ent/:id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.sysToEnt(body, (err, response) => {
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
  .get('/sys/common/:id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.sysToCommon(body, (err, response) => {
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
  .get('/common/content/:ent_user_id/:common_user_id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.commonContent(body, (err, response) => {
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
  .get('/:user_category/:user_id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.messageList(body, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
    try {
      ctx.response.body = await grpcFetch({
        user_id: parseInt(ctx.params.user_id, 10),
        user_category: ctx.params.user_category,
      });
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })

  .get('/ent/chat/total/:id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.entChatTotal(body, (err, response) => {
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
  .get('/common/chat/total/:id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.commonChatTotal(body, (err, response) => {
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
  .get('/ent/content/:ent_user_id/:common_user_id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.entContent(body, (err, response) => {
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
  .get('/ent/total/:id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.entTotal(body, (err, response) => {
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
  .get('/common/total/:id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.commonTotal(body, (err, response) => {
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
  .get('/sys/total/:user_category/:id', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.sysTotal(body, (err, response) => {
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
  .post('/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.insert(body, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
    try {
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  });

// user_category
// user_category
// user_category
// user_id
// user_id
// user_id
// user_id
