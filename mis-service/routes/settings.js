const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/settings',
});

module.exports = router;

router.get('/school/:id', async (ctx) => {
  const sql = `
    select *
    from common_data
    where id = ?
      and uuid = ?
      and category = '院校'
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

router.put('/school/:id', async (ctx) => {
  const sql = `
    update common_data
    set name = ?, comment = ?
    where id = ? and uuid = ? and category = '院校'
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.comment,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/school/', async (ctx) => {
  let sql = '';
  const pool = mysql.promise();
  try {
    if (ctx.request.query.name) {
      sql = `
        select *
        from common_data
        where category = '院校' and position(? in name) > 0
        order by id desc
      `;
      const [rows] = await pool.query(sql, [ctx.request.query.name]);
      ctx.response.body = { message: '', content: rows };
    } else {
      sql = `
        select *
        from common_data
        where category = '院校'
        order by id desc
      `;
      const [rows] = await pool.query(sql);
      ctx.response.body = { message: '', content: rows };
    }
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.post('/school/', async (ctx) => {
  const sql = `
      insert into
        common_data (uuid, master_id, category, name, comment)
        values (uuid(), 0, '院校', ?, ?)
    `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.comment,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/industry/2nd/:id', async (ctx) => {
  const sql = `
    select * from common_data where id = ? and uuid = ? and master_id = ?
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
      ctx.request.query.master_id,
    ]);
    ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/industry/2nd/:id', async (ctx) => {
  const sql = `
    update common_data
    set name = ?, comment = ?
    where id = ? and uuid = ? and master_id = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.comment,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
      parseInt(ctx.request.query.master_id, 10),
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/industry/2nd/:id', async (ctx) => {
  const sql = `
    delete from common_data where id = ? and uuid = ? and master_id = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
      parseInt(ctx.request.query.master_id, 10),
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/industry/2nd/', async (ctx) => {
  const sql = `
    select * from common_data where master_id = ? order by id desc
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [parseInt(ctx.request.query.id, 10)]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.post('/industry/2nd/', async (ctx) => {
  const sql = `
    insert into
      common_data (uuid, master_id, category, name, comment)
      values (uuid(), ?, '行业', ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      parseInt(ctx.request.query.master_id, 10),
      ctx.request.body.name,
      ctx.request.body.comment,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/industry/:id', async (ctx) => {
  const sql = `
    select *
    from common_data
    where id = ? and uuid = ? and category = '行业'
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

router.put('/industry/:id', async (ctx) => {
  const sql = `
    update common_data
    set name = ?, comment = ?
    where id = ? and uuid = ? and category = '行业'
  `;
  const pool = mysql.promise();
  try {
    await pool.query(sql, [
      ctx.request.body.name,
      ctx.request.body.comment,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/industry/:id', async (ctx) => {
  const sql = `
    delete from common_data where id = ? and uuid = ? and category = '行业'
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

router.get('/industry/', async (ctx) => {
  const sql = `
    select * from common_data where master_id = 0 and category = '行业' order by id desc
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

router.post('/industry/', async (ctx) => {
  const sql = `
    insert into
      common_data (uuid, master_id, category, name, comment)
      values (uuid(), 0, '行业', ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.comment,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
