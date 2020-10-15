const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/job-fair',
});

module.exports = router;


router.get('/:id', async (ctx) => {
  const sql = `
    select * from job_fair where id = ?
  `
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [ctx.params.id]);
    ctx.response.body = { message: '', content: rows[0] };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})

router.post('/', async (ctx) => {
  const sql = `
    insert into job_fair (title, content, datime) value (?,?,now())
  `
  const pool = mysql.promise();
  try {
    await pool.query(sql, [ctx.request.body.title,ctx.request.body.content]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})


router.get('/ent/:id', async (ctx) => {
  const sql = `
    select id, uuid, status, name, yingyezhizhao, phone, 
    faren, zhuceriqi, zhuziguimo, yuangongshuliang, address1, 
    address2, address3, address4, industry, intro, url, date, subject 
    from enterprise 
    where id in (select enterprise_id from recruitment 
                 where json_contains(JSON_ARRAY(concat(?,'')),job_fair_id -> '$[*]'))
  `
  const pool = mysql.promise();
  try {
    const [rows] =  await pool.query(sql, [ctx.params.id]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})

router.get('/recruitment/:id/', async (ctx) => {
  const sql = `
    select * from recruitment where json_contains(JSON_ARRAY(concat(?,'')),job_fair_id -> '$[*]')
  `
  const pool = mysql.promise();
  try {
    const [rows] =  await pool.query(sql, [ctx.params.id]);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})

router.put('/', async (ctx) => {

  let where = '';

  const param = []

  if (ctx.request.body.status) {
    where += ' and status=? '
    param.push(ctx.request.body.status) 
  }

  if (ctx.request.body.max) {
    where += ' and datime<=? '
    param.push(ctx.request.body.max)
  }


  if (ctx.request.body.min) {
    where += ' and datime>=? '
    param.push(ctx.request.body.max)
  }


  const sql = `
    select * from job_fair where 1=1 ${where}
  `
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, param);
    ctx.response.body = { message: '', content: rows };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})

router.put('/status/:id/:status', async (ctx) => {
  const sql = `
    update job_fair set status = ? where id = ?
  `
  const pool = mysql.promise();
  try {
    await pool.query(sql, [ctx.params.status, ctx.params.id]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})

router.put('/:id', async (ctx) => {
  const sql = `
    update job_fair set title = ?, content = ? where id = ?
  `
  const pool = mysql.promise();
  try {
    await pool.query(sql, [ctx.request.body.title,ctx.request.body.content, ctx.params.id]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})

router.delete('/:id', async (ctx) => {
  const sql = `
    delete from job_fair where id = ?
  `
  const pool = mysql.promise();
  try {
    await pool.query(sql, [ctx.params.id]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误', content: '' };
  }
})
