const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/enterprise',
});

module.exports = router;

router.get('/certificate/qty', async (ctx) => {
  const sql = `
    select count(*) as qty from enterprise where status = '待认证'
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql);
    ctx.response.body = { message: '', content: rows[0] };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/certificate/filter/', async (ctx) => {
  const sql = `
    select *
    from enterprise
    where position(? in name) > 0
      and status = '待认证'
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [ctx.request.body.name]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/certificate/', async (ctx) => {
  const sql = `
    select * from enterprise where status = '待认证' limit 100
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

router.put('/certificate/', async (ctx) => {
  const sql = `
    update enterprise
    set status = '认证'
    where id = ?
      and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      parseInt(ctx.request.body.id, 10),
      ctx.request.body.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/:id', async (ctx) => {
  const sql = `
    select * from enterprise where id = ? and uuid = ? limit 1
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
    update enterprise
    set name = ?, yingyezhizhao = ?, faren = ?, zhuceriqi = ?,
      zhuziguimo = ?, yuangongshuliang = ?,
      address1 = ?, address2 = ?, address3 = ?, address4 = ?
    where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.yingyezhizhao,
      ctx.request.body.faren,
      ctx.request.body.zhuceriqi,
      ctx.request.body.zhuziguimo,
      ctx.request.body.yuangongshuliang,
      ctx.request.body.address1,
      ctx.request.body.address2,
      ctx.request.body.address3,
      ctx.request.body.address4,
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
    delete from enterprise where id = ? and uuid = ?
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

router.post('/', async (ctx) => {
  const sql = `
    insert into enterprise (
      uuid,
      name, yingyezhizhao, faren, zhuceriqi, zhuziguimo, yuangongshuliang,
      address1, address2, address3, address4
    )
    values (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.yingyezhizhao,
      ctx.request.body.faren,
      ctx.request.body.zhuceriqi,
      ctx.request.body.zhuziguimo,
      ctx.request.body.yuangongshuliang,
      ctx.request.body.address1,
      ctx.request.body.address2,
      ctx.request.body.address3,
      ctx.request.body.address4,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.put('/', async (ctx) => {
  const sql = `
    select *
    from enterprise
    where position(? in name) > 0
    order by id desc
    limit 100
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [ctx.request.body.filter_name]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
