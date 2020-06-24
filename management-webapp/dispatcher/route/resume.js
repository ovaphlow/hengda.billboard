const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/resume',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const sql = `
    select * from resume where id = ? and uuid = ? limit 1
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/:id', async (ctx) => {
  const sql = `
    update resume
    set name = ?, phone = ?, email = ?, gender = ?, birthday = ?,
    school = ?, education = ?, date_begin = ?, date_end = ?, major = ?,
    address1 = ?, address2 = ?,
    qiwangzhiwei = ?, qiwanghangye = ?, yixiangchengshi = ?, ziwopingjia = ?
    where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.phone,
      ctx.request.body.email,
      ctx.request.body.gender,
      ctx.request.body.birthday,
      ctx.request.body.school,
      ctx.request.body.education,
      ctx.request.body.date_begin,
      ctx.request.body.date_end,
      ctx.request.body.major,
      ctx.request.body.address1,
      ctx.request.body.address2,
      ctx.request.body.qiwangzhiwei,
      ctx.request.body.qiwanghangye,
      ctx.request.body.yixiangchengshi,
      ctx.request.body.ziwopingjia,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/:id', async (ctx) => {
  const sql = `
    delete from resume where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/', async (ctx) => {
  const sql = `
    select * from resume where common_user_id = ?
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [parseInt(ctx.request.query.user_id, 10)]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
