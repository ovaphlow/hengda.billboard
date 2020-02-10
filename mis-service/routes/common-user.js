const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/common-user'
})

module.exports = router

router
  .post('/', async ctx => {
    const sql = `
      insert into common_user (username, name, email)
      values (?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.username,
        ctx.request.body.name,
        ctx.request.body.email
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })