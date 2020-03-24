const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/feedback'
})

module.exports = router

router
  .post('/feedback/reply', async ctx => {
    const sql1 = `
      insert into
        sys_message (user_id, category, title, content, datime, status)
        values (?, ?, ?, ?, ?, '未读')
    `
    const sql2 = `
      update feedback
      set status = '已处理'
      where id = ?
        and category = '意见反馈'
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql1, [
        parseInt(ctx.request.body.user_id),
        ctx.request.body.category,
        ctx.request.body.title,
        ctx.request.body.content,
        ctx.request.body.datime
      ])
      await pool.execute(sql2, [parseInt(ctx.request.body.id)])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/feedback/', async ctx => {
    const sql = `
      select *,
        (select username from common_user where id = f.user_id) as username,
        (select name from common_user where id = f.user_id) as name
      from feedback as f
      where category = '意见反馈'
        and status = '未处理'
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
  .post('/complaint/reply', async ctx => {
    const sql1 = `
      insert into
        sys_message (user_id, category, title, content, datime, status)
        values (?, ?, ?, ?, ?, '未读')
    `
    const sql2 = `
      update feedback
      set status = '已处理'
      where id = ?
        and category = '投诉'
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql1, [
        parseInt(ctx.request.body.user_id),
        ctx.request.body.category,
        ctx.request.body.title,
        ctx.request.body.content,
        ctx.request.body.datime
      ])
      await pool.execute(sql2, [parseInt(ctx.request.body.id)])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/complaint/', async ctx => {
    const sql = `
      select *,
        (select username from common_user where id = f.user_id) as username,
        (select name from common_user where id = f.user_id) as name
      from feedback as f
      where category = '投诉'
        and status = '未处理'
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
