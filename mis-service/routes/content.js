const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/content'
})

module.exports = router

router
  .get('/campus/:id', async ctx => {
    const sql = `
      select * from campus where id = ? and uuid = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/campus/:id', async ctx => {
    const sql = `
      update campus
      set title = ?, date = ?, time = ?,
        address_level1 = ?, address_level2 = ?, address_level3 = ?, address_level4 = ?,
        school = ?, content=?
      where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.date,
        ctx.request.body.time,
        ctx.request.body.address_level1,
        ctx.request.body.address_level2,
        ctx.request.body.address_level3,
        ctx.request.body.address_level4,
        ctx.request.body.school,
        ctx.request.body.content,
        parseInt(ctx.params.id)
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/campus/:id', async ctx => {
    const sql = `
      delete from campus where id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        parseInt(ctx.params.id),
        ctx.request.query.uuid
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
        campus (uuid, mis_user_id, title, date, time,
          address_level1, address_level2, address_level3, address_level4,
          school, content)
        values (uuid(), 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.date,
        ctx.request.body.time,
        ctx.request.body.address_level1,
        ctx.request.body.address_level2,
        ctx.request.body.address_level3,
        ctx.request.body.address_level4,
        ctx.request.body.school,
        ctx.request.body.content
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/topic/:id', async ctx => {
    const sql = `
      select * from topic where id = ? and uuid = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/topic/:id', async ctx => {
    const sql = `
      update topic set title = ?, date = ?, time = ?, content=? where id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.date,
        ctx.request.body.time,
        ctx.request.body.content,
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/topic/:id', async ctx => {
    const sql = `
      delete from topic where id = ? and uuid = ?
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
  .get('/topic/', async ctx => {
    const sql = `
      select * from topic order by id desc limit 100
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
  .put('/topic/', async ctx => {
    const sql = `
      select * from topic where date = ? and position(? in title) > 0
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
  .post('/topic/', async ctx => {
    const sql = `
      insert into
        topic (uuid, mis_user_id, title, date, time, content)
        values (uuid(), 0, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.title,
        ctx.request.body.date,
        ctx.request.body.time,
        ctx.request.body.content
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/recommend/', async ctx => {
    let sql = `
      select 
        id, uuid, category, title, date1, date2, 
        address_level1, address_level2, publisher, 
        qty, baomignfangshi 
      from 
        recommend limit 100`
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql)
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/recommend/:id/', async ctx => {
    let sql = `select * from recommend where id = ? and uuid = ?`
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.params.id,
        ctx.query.uuid
      ])
      ctx.response.body = { message: '', content: rows[0] }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/recommend/:id', async ctx => {
    let sql = `
      update recommend 
      set
        category = ?, 
        title = ?, 
        date1 = ?, 
        date2 = ?, 
        address_level1 = ?, 
        address_level2 = ?, 
        publisher = ?, 
        qty = ?, 
        baomignfangshi = ?, 
        content = ?
      where
        id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.category,
        ctx.request.body.title,
        ctx.request.body.date1,
        ctx.request.body.date2,
        ctx.request.body.address_level1,
        ctx.request.body.address_level2,
        ctx.request.body.publisher,
        ctx.request.body.qty,
        ctx.request.body.baomingfangshi,
        ctx.request.body.content,
        ctx.params.id,
        ctx.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .post('/recommend/', async ctx => {
    let sql = `
      insert into recommend 
        (uuid, category, title, date1, date2, address_level1, 
          address_level2, publisher, qty, baomignfangshi, content) 
      value 
        (uuid(),?,?,?,?,?,?,?,?,?,?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.category,
        ctx.request.body.title,
        ctx.request.body.date1,
        ctx.request.body.date2,
        ctx.request.body.address_level1,
        ctx.request.body.address_level2,
        ctx.request.body.publisher,
        ctx.request.body.qty,
        ctx.request.body.baomingfangshi,
        ctx.request.body.content
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/recommend/:id/',async ctx => {
    let sql = `delete from recommend where id = ? and uuid = ?`
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.params.id,
        ctx.query.uuid
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
      select * from banner where id = ? and uuid = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
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
        and uuid = ?
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
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/banner/:id', async ctx => {
    const sql = `
      delete from banner where id = ? and uuid = ?
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
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
