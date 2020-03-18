const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/content'
})

module.exports = router

router
  .get('/campus/:id', async ctx => {
    const sql = `
      select * from campus where id = ? limit 1
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
  .put('/campus/:id', async ctx => {
    const sql = `
      update campus set title = ?, date = ?, time = ? where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.date,
        ctx.request.body.time,
        ctx.params.id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/campus/', async ctx => {
    const sql = `
      select * from campus order by id desc limit 100
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql)
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.info(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/campus/', async ctx => {
    const sql = `
      select *
      from campus
      where date = ?
        and position(? in title) > 0
      limit 100
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.request.body.date,
        ctx.request.body.title
      ])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .post('/campus/', async ctx => {
    const sql = `
      insert into
        campus (uuid, mis_user_id, title, date, time, content)
        values (uuid(), 0, ?, ?, ?, '')
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.date,
        ctx.request.body.time
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

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
      set status = ?, category = ?, title = ?, comment = ?, datime = ?, data_url = ?
      where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.status,
        ctx.request.body.category,
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
  .put('/banner/', async ctx => {
    const sql = `
      select *
      from banner
      where category = ?
        and status = ?
      order by datime desc
      limit 200
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.request.body.category,
        ctx.request.body.status
      ])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .post('/banner/', async ctx => {
    const sql = `
      insert into
        banner (status, category, title, comment, datime, data_url)
        values ('未启用', ?, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.category,
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