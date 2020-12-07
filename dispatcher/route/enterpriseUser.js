const Router = require('@koa/router');
const crypto = require('crypto');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');
const console = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/enterpriseUser.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).enterpriseUser;

const grpcClient = new proto.EnterpriseUser(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/ent-user',
});

const getSalted = (password, salt) => {
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(password);
  return hmac.digest('hex');
};

module.exports = router;

router
  .get('/:id/', async (ctx) => {
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
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  // 注册：拼写错误，应为sign-up
  .post('/sign-in/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.signIn(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      const salt = crypto.randomBytes(8).toString('hex');
      const passwordSalted = getSalted(ctx.request.body.password, salt);
      ctx.response.body = await grpcFetch({
        ...ctx.request.body,
        password: passwordSalted,
        salt,
      });
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .put('/updatePassword/:id', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.upPasswordCheck(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    const updatePasswordFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.updatePassword(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      ctx.request.body.uuid = ctx.query.u_id;
      ctx.request.body.id = ctx.params.id;
      const result = await grpcFetch(ctx.request.body);
      if (result.message) {
        ctx.response.body = result;
      } else {
        const passwordSalted = getSalted(
          ctx.request.body.old_password,
          result.content.salt,
        );
        if (passwordSalted !== result.content.password) {
          ctx.response.body = { message: '密码错误' };
        } else {
          const salt = crypto.randomBytes(8).toString('hex');
          const passwordSalted1 = getSalted(ctx.request.body.password1, salt);
          ctx.response.body = await updatePasswordFetch({
            id: result.content.id,
            uuid: result.content.uuid,
            password: passwordSalted1,
            salt,
          });
        }
      }
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .put('/checkEmail/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.checkEmail(body, (err, response) => {
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
  })
  .put('/checkPhone/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.checkPhone(body, (err, response) => {
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
  })
  .put('/checkRecover/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.checkRecover(body, (err, response) => {
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
  })
  .put('/recover/', async (ctx) => {
    const grpcFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.recover(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    const updatePasswordFetch = (body) =>
      new Promise((resolve, reject) => {
        grpcClient.updatePassword(body, (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(JSON.parse(response.data));
          }
        });
      });
    try {
      const result = await grpcFetch(ctx.request.body);
      if (result.message) {
        ctx.response.body = result;
      } else {
        const salt = crypto.randomBytes(8).toString('hex');
        const passwordSalted = getSalted(ctx.request.body.password, salt);
        await updatePasswordFetch({
          id: result.content.id,
          uuid: result.content.uuid,
          password: passwordSalted,
          salt,
        });
        ctx.response.body = { content: true };
      }
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .put('/:id', async (ctx) => {
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
      ctx.request.body.uuid = ctx.query.uuid;
      ctx.request.body.id = ctx.params.id;
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  });

router.post('/log-in/', async (ctx) => {
  const grpcFetch = (body) =>
    new Promise((resolve, reject) => {
      grpcClient.logIn(body, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
  try {
    const result = await grpcFetch(ctx.request.body);
    if (result.message) {
      ctx.response.body = result;
    } else {
      const passwordSalted = getSalted(
        ctx.request.body.password,
        result.content.salt,
      );
      if (passwordSalted !== result.content.password) {
        ctx.response.body = { message: '用户名或密码错误', content: '' };
      } else {
        result.content.salt = undefined;
        result.content.password = undefined;
        ctx.response.body = result;
      }
    }
  } catch (err) {
    console.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
