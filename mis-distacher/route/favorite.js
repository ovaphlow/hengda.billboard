const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/favorite',
});

module.exports = router;

router.get('/', async (ctx) => {
  const sql = `
    select f.*,
      (select name from common_user where id = f.user_id) as name,
      (select phone from common_user where id = f.user_id) as phone
    from favorite as f
    where user_id = ?
      and category1 = '个人用户'
    order by id desc
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.master_id, 10),
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
