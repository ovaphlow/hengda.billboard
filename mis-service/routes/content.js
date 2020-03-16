const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/content'
})

module.exports = router

router
  .get('/banner/:id', async ctx => {
    const sql = `
      select * from banner where id = ? limit 1
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
  .put('/banner/:id', async ctx => {
    const sql = `
      update banner
      set status = ?, title = ?, comment = ?, datime = ?, data_url = ?
      where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.status,
        ctx.request.body.title,
        ctx.request.body.comment,
        ctx.request.body.datime,
        ctx.request.body.data_url,
        ctx.params.id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/banner/', async ctx => {
    const sql = `
      select * from banner order by status, datime desc limit 200
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
  .post('/banner/', async ctx => {
    const sql = `
      insert into
        banner (status, title, comment, datime, data_url)
        values ('未启用', ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.comment,
        ctx.request.body.datime,
        ctx.request.body.data_url
      ])
      ctx.response.body = { message: '', content: ''}
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })