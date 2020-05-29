const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/bulletin',
});

module.exports = router;

router.post('/', async (ctx) => {
  logger.info(ctx.request.body);
  const pool = mysql.promise();
  try {
    const sql = `
      insert into
        bullet (uuid, title, content, dday, user_category, filter)
        values (?, ?, ?, ?, ?, ?)
    `;
    const [rows] = await pool.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.title,
      ctx.request.body.content,
      ctx.request.body.dday,
      ctx.request.body.user_category,
      ctx.request.body.filter,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
