const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/report',
});

module.exports = router;

router.get('/', async (ctx) => {
  const sql = `
    select *,
      (select name from common_user where id = r.user_id) as name,
      (select phone from common_user where id = r.user_id) as phone
    from report as r
    order by id desc
    limit 2000
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
