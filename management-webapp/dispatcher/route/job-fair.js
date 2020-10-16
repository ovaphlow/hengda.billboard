const Router = require('@koa/router');

const logger = require('../logger');
const mysql = require('../mysql');

const router = new Router({
  prefix: '/api/job-fair',
});

module.exports = router;

<<<<<<< HEAD

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
=======
router.put('/', async (ctx) => {
  const query = ctx.request.query.category || '';
  const pool = mysql.promise();
  try {
    switch (query) {
      case '':
        const sql = `
        select id, title, content, datime, status
        from job_fair
        order by id desc
        limit 100
        `;
        const [rows] = await pool.query(sql);
        ctx.response.body = rows;
        break;
      default:
        ctx.response.body = [];
    }
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
  }
});

router.post('/', async (ctx) => {
  const sql = `
  insert into job_fair
      (title, content, datime)
  values (?, ?, ?);
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.title,
      ctx.request.body.content,
      ctx.request.body.datime,
    ]);
    ctx.response.status = 200;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
  }
});

router.get('/:id', async (ctx) => {
  const sql = `
  select id, title, content, datime, status
  from job_fair
  where id = ?
  limit 1
  `;
  const pool = mysql.promise();
  try {
    const [rows] = await pool.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = !!rows.length ? rows[0] : {};
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
  }
});

router.put('/:id', async (ctx) => {
  const sql = `
  update job_fair
  set title = ?, content = ?, datime = ?, status = ?
  where id = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [
      ctx.request.body.title,
      ctx.request.body.content,
      ctx.request.body.datime,
      ctx.request.body.status,
      parseInt(ctx.params.id, 10),
    ]);
    ctx.response.status = 200;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
  }
});

router.delete('/:id', async (ctx) => {
  // 还需要删除对应的岗位表中的数据
  const sql = `
  delete from job_fair where id = ?
  `;
  const pool = mysql.promise();
  try {
    await pool.execute(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.status = 200;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
  }
});
>>>>>>> master
