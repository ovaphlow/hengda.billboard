const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/enterprise-user'
})

module.exports = router

router.get('/:id', async ctx => {
  const sql = `
    select id, enterprise_id, username, name, phone
    from enterprise_user
    where id = ? and uuid = ? and enterprise_id = ?
    limit 1
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql, [
      parseInt(ctx.params.id),
      ctx.request.query.uuid,
      parseInt(ctx.request.query.enterprise_id)
    ])
    ctx.response.body = { message: '', content: rows.length === 1 ? rows[0]: {} }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.put('/:id', async ctx => {
  const sql = `
    update enterprise_user
    set username = ?, name = ?, phone = ?
    where id = ? and uuid = ? and enterprise_id = ?
  `
  const pool = mysql.promise()
  try {
    await pool.execute(sql, [
      ctx.request.body.username,
      ctx.request.body.name,
      ctx.request.body.phone,
      parseInt(ctx.params.id),
      ctx.request.query.uuid,
      parseInt(ctx.request.query.enterprise_id)
    ])
    ctx.response.body = { message: '', content: '' }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.delete('/:id', async ctx => {
  const sql = `
    delete from enterprise_user where id = ? and uuid = ? and enterprise_id = ?
  `
  const pool = mysql.promise()
  try {
    await pool.execute(sql, [
      parseInt(ctx.params.id),
      ctx.request.query.uuid,
      parseInt(ctx.request.query.enterprise_id)
    ])
    ctx.response.body = { message: '', content: '' }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.get('/', async ctx => {
  const sql = `
    select id, uuid, enterprise_id, username, name, phone
    from enterprise_user
    where enterprise_id = ? and enterprise_uuid = ?
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql, [
      parseInt(ctx.request.query.enterprise_id),
      ctx.request.query.enterprise_uuid
    ])
    ctx.response.body = { message: '', content: rows }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})
