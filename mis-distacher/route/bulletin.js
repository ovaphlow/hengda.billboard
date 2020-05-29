const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/bulletin',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const pool = mysql.promise();
  try {
    const sql = `
      select * from bulletin where id = ? and uuid = ? limit 1
    `;
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
  const pool = mysql.promise();
  try {
    const sql = `
      update bulletin
      set uuid = ?, title = ?, dday = ?, receiver = ?, doc = ?
      where id = ? and uuid = ?
    `;
    await pool.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.title,
      ctx.request.body.dday,
      ctx.request.body.receiver,
      ctx.request.body.doc,
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
  const pool = mysql.promise();
  try {
    const sql = `
      select *
      from bulletin
      order by id desc
      limit 100
    `;
    const [rows] = await pool.query(sql);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});

router.post('/', async (ctx) => {
  logger.info(ctx.request.body);
  const pool = mysql.promise();
  try {
    const sql = `
      insert into
        bulletin (uuid, title, doc, dday, receiver, doc)
        values (?, ?, ?, ?, ?)
    `;
    const [rows] = await pool.query(sql, [
      ctx.request.body.uuid,
      ctx.request.body.title,
      ctx.request.body.dday,
      ctx.request.body.receiver,
      ctx.request.body.doc,
    ]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});
