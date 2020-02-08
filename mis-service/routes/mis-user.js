const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/mis-user'
})

module.exports = router

router
  .post('/sign-in', async ctx => {
    console.info(ctx.request.body)
    ctx.response.body = { message: '', content: '' }
  })

router
  .get('/:id', async ctx => {
    const sql = `
      select id, username, name
      from mis_user
      where id = ?
      limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [ctx.params.id])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {}}
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/:id', async ctx => {
    console.info(ctx.request.body)
    console.info(ctx.params)
    const sql = `
      update mis_user
        set username = ?, name = ?
      where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [ctx.request.body.username, ctx.request.body.name, parseInt(ctx.params.id)])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/', async ctx => {
    const sql = `
      select id, username, name
      from mis_user
      order by id desc
      limit 200
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql)
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .post('/', async ctx => {
    const sql = `
      insert into mis_user (username, name)
      values (?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [ctx.request.body.username, ctx.request.body.name])
      ctx.response.body = { message: '', content: ''}
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })