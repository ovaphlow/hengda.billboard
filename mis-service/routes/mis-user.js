const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/mis-user'
})

module.exports = router

router
  .post('/sign-in', async ctx => {
    const sql = `
      select id, uuid, username, name
      from mis_user
      where username = ?
        and password = ?
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.request.body.username,
        ctx.request.body.password
      ])
      if (rows.length !== 1) {
        ctx.response.body = { message: '用户名或密码错误', content: {} }
      } else {
        ctx.response.body = { message: '', content: rows[0] }
      }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/:id', async ctx => {
    const sql = `
      select id, uuid, username, name
      from mis_user
      where id = ? and uuid = ?
      limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {}}
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/:id', async ctx => {
    const sql = `
      update mis_user
        set username = ?, name = ?
      where id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.username,
        ctx.request.body.name,
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/:id', async ctx => {
    const sql = `
      delete from mis_user where id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [parseInt(ctx.params.id), ctx.request.query.uuid])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/', async ctx => {
    const sql = `
      select id, uuid, username, name
      from mis_user
      order by id desc
      limit 100
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
      insert into mis_user (uuid, username, password, name)
      values (uuid(), ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.username,
        ctx.request.body.password,
        ctx.request.body.name
      ])
      ctx.response.body = { message: '', content: ''}
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
