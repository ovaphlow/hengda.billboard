const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/delivery',
});

module.exports = router;

router.put('/', async (ctx) => {
  const sql = `
    select *,
      (select name from resume where id = d.resume_id ) as resume_name,
      (select name from recruitment where id = d.recruitment_id ) as recruitment_name
    from delivery as d
    where resume_id = (select id from resume where common_user_id = ? limit 1)
      and datime between ? and ?
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.body.filter_date_begin,
      ctx.request.body.filter_date_end,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
