const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/common-user'
})

module.exports = router

router
  .put('/', async ctx => {
    const sql = `
      select * from common_user
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