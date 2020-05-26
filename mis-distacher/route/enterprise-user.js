const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/enterprise-user',
});

module.exports = router;

router.put('/filter', async (ctx) => {
  const sql = `
    select eu.id, eu.uuid, enterprise_id, enterprise_uuid, eu.name, eu.phone,
      e.name as enterprise
    from enterprise_user as eu
      join enterprise as e on e.id = eu.enterprise_id
    where position(? in eu.name) > 0
      or position(? in eu.phone) > 0
      or position(? in e.name) > 0
    order by id desc
    limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      ctx.request.body.filter,
      ctx.request.body.filter,
      ctx.request.body.filter,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/:id', async (ctx) => {
  const sql = `
    select id, enterprise_id, name, phone
    from enterprise_user
    where id = ? and uuid = ?
    limit 1
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
    update enterprise_user
    set username = ?, name = ?, phone = ?
    where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.username,
      ctx.request.body.name,
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
  const sql = `
    delete from enterprise_user where id = ? and uuid = ?
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

router.put('/', async (ctx) => {
  const sql = `
    select eu.id, eu.uuid, enterprise_id, enterprise_uuid, eu.name, eu.phone,
      e.name as enterprise
    from enterprise_user as eu
      join enterprise as e on e.id = eu.enterprise_id
    order by id desc
    limit 100
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

router.get('/', async (ctx) => {
  const sql = `
    select eu.id, eu.uuid, enterprise_id, enterprise_uuid, eu.name, eu.phone
    from enterprise_user as eu
    where enterprise_id = ? and enterprise_uuid = ?
    order by id desc
    limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.request.query.enterprise_id, 10),
      ctx.request.query.enterprise_uuid,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
