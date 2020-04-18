const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/recruitment'
})

module.exports = router

router.get('/:id', async ctx => {
  const sql = `
    select *
    from recruitment
    where id = ? and uuid = ?
    limit 1
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql, [
      parseInt(ctx.params.id),
      ctx.request.query.uuid
    ])
    ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.put('/:id', async ctx => {
  const sql = `
    update recruitment
    set name = ?, qty = ?,
      address1 = ?, address2 = ?, address3 = ?,
      date = ?, salary1 = ?, salary2 = ?, education = ?, category = ?,
      description = ?, requirement = ?
    where id = ? and uuid = ?
  `
  const pool = mysql.promise()
  try {
    await pool.execute(sql, [
      ctx.request.body.name,
      ctx.request.body.qty,
      ctx.request.body.address1,
      ctx.request.body.address2,
      ctx.request.body.address3,
      ctx.request.body.date,
      ctx.request.body.salary1,
      ctx.request.body.salary2,
      ctx.request.body.education,
      ctx.request.body.category,
      ctx.request.body.description,
      ctx.request.body.requirement,
      parseInt(ctx.params.id),
      ctx.request.query.recruitment_uuid
    ])
    ctx.response.body = { message: '', content: '' }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.delete('/:id', async ctx => {
  const sql = `
    delete from recruitment where id = ? and uuid = ?
  `
  const pool = mysql.promise()
  try {
    await pool.execute(sql, [
      parseInt(ctx.params.id),
      ctx.request.query.recruitment_uuid
    ])
    ctx.response.body = { message: '', content: '' }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.get('/', async ctx => {
  const sql = `
    select * from recruitment where enterprise_id = ? limit 200
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql, [ctx.request.query.enterprise_id])
    ctx.response.body = { message: '', content: rows }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})
