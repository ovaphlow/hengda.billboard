const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/current-user',
});

module.exports = router;

router.put('/change-password', async (ctx) => {
  const pool = mysql.promise();
  try {
    let sql = `
      select password from mis_user where id = ? limit 1
    `;
    const [rows] = await pool.query(sql, [parseInt(ctx.request.body.id, 10)]);
    if (rows[0].password !== ctx.request.body.current_password) {
      ctx.response.body = { message: '当前密码输入错误', content: '' };
      return;
    }
    sql = `
      update mis_user set password = ? where id = ?
    `;
    await pool.query(sql, [
      ctx.request.body.new_password,
      parseInt(ctx.request.body.id, 10),
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
