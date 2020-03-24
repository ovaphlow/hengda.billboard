const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/report'
})

module.exports = router

router
  .get('/', async ctx => {
    const sql = `
      select *,
        (select username from common_user where id = r.user_id) as username,
        (select name from common_user where id = r.user_id) as name
      from report as r
      order by id desc
      limit 2000
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
