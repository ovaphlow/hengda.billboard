const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/common-user',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const sql = `
    select id, uuid, name, email, phone
    from common_user
    where id = ? and uuid = ?
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
    update common_user
    set username = ?, name = ?, email = ?, phone = ?
    where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.query(sql, [
      ctx.request.body.username,
      ctx.request.body.name,
      ctx.request.body.email,
      ctx.request.body.phone,
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
  // 需要处理用户的简历？
  const sql = `
    delete from common_user where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [parseInt(ctx.params.id, 10), ctx.request.query.uuid]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/', async (ctx) => {
  const sql = `
    select id, uuid, name, phone, email,
      (select count(*) from favorite where user_id = cu.id) as qty_favorite
      -- 投递数量
      -- (select count(*) from favorite where common_user_id = cu.id) as qty_delivery
    from common_user as cu
    where position(? in name) > 0
      or position(? in phone) > 0
    order by id desc
    limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      ctx.request.body.filter_name,
      ctx.request.body.filter_name,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
