const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/settings'
})

module.exports = router

router
  .get('/school/', async ctx => {})
  .post('/school/', async ctx => {
    const sql = `
      insert into
        common_data (uuid, master_id, name, comment)
        values (uuid(), 0, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.name,
        ctx.request.body.comment
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
