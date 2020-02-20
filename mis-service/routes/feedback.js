const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/feedback'
})

module.exports = router

router
  .get('/feedback/', async ctx => {
    const sql = `
      select *,
        (select username from common_user where id = f.common_user_id) as username,
        (select name from common_user where id = f.common_user_id) as name
      from feedback as f
      where category = '意见反馈'
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

router
  .get('/complaint/', async ctx => {
    const sql = `
      select *,
        (select username from common_user where id = f.common_user_id) as username,
        (select name from common_user where id = f.common_user_id) as name
      from feedback as f
      where category = '投诉'
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