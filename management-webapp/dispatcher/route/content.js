const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/content',
});

module.exports = router;

router.get('/campus/:id', async (ctx) => {
  const sql = `
    select * from campus where id = ? and uuid = ? limit 1
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

router.put('/campus/:id', async (ctx) => {
  const sql = `
    update campus
    set title = ?, date = ?, time = ?,
      address_level1 = ?, address_level2 = ?, address_level3 = ?, address_level4 = ?,
      school = ?, content = ?, category = ?
    where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.title,
      ctx.request.body.date,
      ctx.request.body.time,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.address_level3,
      ctx.request.body.address_level4,
      ctx.request.body.school,
      ctx.request.body.content,
      ctx.request.body.category,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/campus/:id', async (ctx) => {
  const sql = `
    delete from campus where id = ? and uuid = ?
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

router.get('/campus/', async (ctx) => {
  const sql = `
    select id, uuid, category, mis_user_id, date, time, title, school,
      address_level1, address_level2, address_level3, address_level4
    from campus
    order by id desc
    limit 20
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

router.put('/campus/', async (ctx) => {
  const sql = `
    select id, uuid, category, mis_user_id, date, time, title, school,
      address_level1, address_level2, address_level3, address_level4
    from campus
    where position(? in date) > 0
      and position(? in title) > 0
    order by id desc
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      ctx.request.body.date,
      ctx.request.body.title,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.post('/campus/', async (ctx) => {
  const sql = `
    insert into
      campus (uuid, mis_user_id, title, date, time,
        address_level1, address_level2, address_level3, address_level4,
        school, content, category)
      values (uuid(), 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.title,
      ctx.request.body.date,
      ctx.request.body.time,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.address_level3,
      ctx.request.body.address_level4,
      ctx.request.body.school,
      ctx.request.body.content,
      ctx.request.body.category,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/topic/:id', async (ctx) => {
  const sql = `
    select * from topic where id = ? and uuid = ? limit 1
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

router.put('/topic/:id', async (ctx) => {
  const sql = `
    update topic set title = ?, tag = ?, date = ?, time = ?, content=? where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.title,
      ctx.request.body.tag,
      ctx.request.body.date,
      ctx.request.body.time,
      ctx.request.body.content,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/topic/:id', async (ctx) => {
  const sql = `
    delete from topic where id = ? and uuid = ?
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

router.get('/topic/', async (ctx) => {
  const sql = `
    select id, uuid, date, time, mis_user_id, tag, title
    from topic
    order by id desc
    limit 20
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

router.put('/topic/', async (ctx) => {
  const sql = `
    select id, uuid, date, time, mis_user_id, tag, title
    from topic
    where position(? in date) > 0
      and position(? in title) > 0
    order by id desc
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      ctx.request.body.date,
      ctx.request.body.title,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.post('/topic/', async (ctx) => {
  const sql = `
    insert into
      topic (uuid, mis_user_id, tag, title, date, time, content)
      values (uuid(), 0, ?,  ?, ?, ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.tag,
      ctx.request.body.title,
      ctx.request.body.date,
      ctx.request.body.time,
      ctx.request.body.content,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/recommend/:id', async (ctx) => {
  const sql = 'select * from recommend where id = ? and uuid = ?';
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

router.put('/recommend/:id', async (ctx) => {
  const sql = `
    update recommend
    set
      category = ?,
      title = ?,
      date1 = ?,
      date2 = ?,
      address_level1 = ?,
      address_level2 = ?,
      publisher = ?,
      qty = ?,
      baomignfangshi = ?,
      content = ?
    where
      id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.category,
      ctx.request.body.title,
      ctx.request.body.date1,
      ctx.request.body.date2,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.publisher,
      ctx.request.body.qty,
      ctx.request.body.baomingfangshi,
      ctx.request.body.content,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/recommend/:id', async (ctx) => {
  const sql = 'delete from recommend where id = ? and uuid = ?';
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.params.id,
      ctx.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/recommend/', async (ctx) => {
  const sql = `
    select
      id, uuid, category, title, date1, date2,
      address_level1, address_level2, publisher,
      qty, baomignfangshi
    from
      recommend
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

router.post('/recommend/', async (ctx) => {
  const sql = `
    insert into recommend
      (uuid, category, title, date1, date2, address_level1,
        address_level2, publisher, qty, baomignfangshi, content)
    value
      (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.category,
      ctx.request.body.title,
      ctx.request.body.date1,
      ctx.request.body.date2,
      ctx.request.body.address_level1,
      ctx.request.body.address_level2,
      ctx.request.body.publisher,
      ctx.request.body.qty,
      ctx.request.body.baomingfangshi,
      ctx.request.body.content,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.get('/banner/:id', async (ctx) => {
  const sql = `
    select * from banner where id = ? and uuid = ? limit 1
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

router.put('/banner/:id', async (ctx) => {
  const sql = `
    update banner
    set status = ?, category = ?, title = ?, comment = ?, datime = ?, data_url = ?
    where id = ? and uuid = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.status,
      ctx.request.body.category,
      ctx.request.body.title,
      ctx.request.body.comment,
      ctx.request.body.datime,
      ctx.request.body.data_url,
      parseInt(ctx.params.id, 10),
      ctx.request.query.uuid,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.delete('/banner/:id', async (ctx) => {
  const sql = `
    delete from banner where id = ? and uuid = ?
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

router.put('/banner/', async (ctx) => {
  const sql = `
    select *
    from banner
    where category = ?
      and status = ?
    order by datime desc
    limit 200
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [
      ctx.request.body.category,
      ctx.request.body.status,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.post('/banner/', async (ctx) => {
  const sql = `
    insert into
      banner (uuid, status, category, title, comment, datime, data_url)
      values (uuid(), ?, ?, ?, ?, ?, ?)
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.status,
      ctx.request.body.category,
      ctx.request.body.title,
      ctx.request.body.comment,
      ctx.request.body.datime,
      ctx.request.body.data_url,
    ]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
