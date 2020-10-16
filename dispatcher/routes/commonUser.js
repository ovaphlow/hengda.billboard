const Router = require('@koa/router');
const grpc = require('grpc');
const crypto = require('crypto');
const protoLoader = require('@grpc/proto-loader');
const config = require('../config');
const console = require('../logger');

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(`${__dirname}/../proto/commonUser.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }),
).commonUser;

const grpcClient = new proto.CommonUser(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/common-user',
});

module.exports = router;

router.post('/sign-in', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
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
    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(ctx.request.body.password);
    const passwordSalted = hmac.digest('hex');
    ctx.response.body = await grpcFetch({
      ...ctx.request.body,
      password: passwordSalted,
      salt,
    });
  } catch (err) {
    console.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.post('/log-in/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
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
      const hmac = crypto.createHmac('sha256', result.content.salt);
      hmac.update(ctx.request.body.password);
      const passwordSalted = hmac.digest('hex');
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

router.put('/recover/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.recover(body, (err, response) => {
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
    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(ctx.request.body.password);
    const passwordSalted = hmac.digest('hex');
    ctx.response.body = await grpcFetch({
      ...ctx.request.body,
      password: passwordSalted,
      salt,
    });
  } catch (err) {
    console.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/checkEmail/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
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
});

router.put('/checkRecover/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
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
});

router
  .get('/:id', async (ctx) => {
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
      ctx.params.uuid = ctx.query.uuid;
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .put('/phone', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.phone(body, (err, response) => {
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
  .put('/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
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
      ctx.response.body = await grpcFetch(ctx.request.body);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .get('/journal/:user_id/', async (ctx) => {
    const grpcFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.journal(body, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });
    try {
      ctx.params.category = '个人用户';
      ctx.response.body = await grpcFetch(ctx.params);
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  })
  .post('/updatePassword/', async (ctx) => {
    const checkPasswordFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.checkPassword(body, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });

    const checkCaptchaFetch = (body) => new Promise((resolve, reject) => {
      grpcClient.checkCaptcha(body, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(JSON.parse(response.data));
        }
      });
    });

    const updatePasswordFetch = (body) => new Promise((resolve, reject) => {
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
      let result = await checkPasswordFetch({
        id: ctx.request.body.id,
        uuid: ctx.query.uuid,
      });
      let hmac = crypto.createHmac('sha256', result.content.salt);
      hmac.update(ctx.request.body.old_password);
      let passwordSalted = hmac.digest('hex');
      if (passwordSalted !== result.content.password) {
        ctx.response.body = { message: '密码错误' };
      } else {
        result = await checkCaptchaFetch({
          id: ctx.request.body.id,
          code: ctx.request.body.code,
          uuid: ctx.query.uuid,
          email: ctx.request.body.email,
        });
        if (result.content) {
          const salt = crypto.randomBytes(8).toString('hex');
          hmac = crypto.createHmac('sha256', salt);
          hmac.update(ctx.request.body.new_password);
          passwordSalted = hmac.digest('hex');
          result = await updatePasswordFetch({
            id: ctx.request.body.id,
            uuid: ctx.query.uuid,
            password: passwordSalted,
            email: ctx.request.body.email,
            salt,
          });
          ctx.response.body = result;
        } else {
          ctx.response.body = { message: '验证码错误' };
        }
      }
    } catch (err) {
      console.error(err);
      ctx.response.body = { message: '服务器错误' };
    }
  });
