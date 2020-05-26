const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/journal',
});

module.exports = router;

router.get('/sign-in/', async (ctx) => {
  const sql = `
    select *
    from login_journal
    where user_id = ?
      and category = ?
    order by id desc
    limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.query.category,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/sign-in/', async (ctx) => {
  const sql = `
    select *
    from login_journal
    where user_id = ?
      and datime between ? and ?
      and category = ?
    limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.body.date_begin,
      ctx.request.body.date_end,
      ctx.request.query.category,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/browse/', async (ctx) => {
  const sql = `
    select *
    from browse_journal
    where common_user_id = ?
      and common_user_uuid = ?
    order by id desc limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.query.user_uuid,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/browse/', async (ctx) => {
  const sql = `
    select *
    from browse_journal
    where common_user_id = ?
      and datime between ? and ?
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.body.date_begin,
      ctx.request.body.date_end,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/edit/', async (ctx) => {
  const sql = `
    select *
    from edit_journal
    where user_id = ?
      and user_uuid = ?
      and category1 = '个人用户'
    order by id desc limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.query.user_uuid,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/edit/', async (ctx) => {
  const sql = `
    select *
    from edit_journal
    where user_id = ?
      and datime between ? and ?
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.user_id, 10),
      ctx.request.body.date_begin,
      ctx.request.body.date_end,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
