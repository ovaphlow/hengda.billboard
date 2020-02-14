const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/common-user'
})

module.exports = router

router
  .get('/:id/resume/', async ctx => {
    const sql = `
      select * from resume where common_user_id = ?
      limit 10
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [ctx.params.id])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/:id', async ctx => {
    const sql = `
      select id, username, name, email, phone
      from common_user
      where id = ?
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [ctx.params.id])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/:id', async ctx => {
    const sql = `
      update common_user
      set username = ?, name = ?, email = ?, phone = ?
      where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.query(sql, [
        ctx.request.body.username,
        ctx.request.body.name,
        ctx.request.body.email,
        ctx.request.body.phone,
        ctx.request.body.id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .put('/', async ctx => {
    const sql = `
      select id, name, username, phone, email from common_user
      where position(? in name) > 0
      limit 2000
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [ctx.request.body.filter_name])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .post('/', async ctx => {
    const sql = `
      insert into common_user (username, password, name, email, phone)
      values (?, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.username,
        ctx.request.body.password,
        ctx.request.body.name,
        ctx.request.body.email,
        ctx.request.body.phone,
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })