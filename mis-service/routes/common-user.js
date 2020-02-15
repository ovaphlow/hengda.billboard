const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/common-user'
})

module.exports = router

router
  .get('/:id/resume/:resume_id', async ctx => {
    const sql = `
      select * from resume where id = ? and common_user_id = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.params.resume_id,
        ctx.params.id
      ])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
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
  .post('/:id/resume/', async ctx => {
    const sql = `
      insert into resume (
        common_user_id, name, phone, email, gender, birthday,
        school, education, date_begin, date_end, major,
        address1, address2, address3,
        qiwangzhiwei, qiwanghangye, yixiangchengshi, ziwopingjia
      )
      values (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?
      )
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.params.id,
        ctx.request.body.name,
        ctx.request.body.phone,
        ctx.request.body.email,
        ctx.request.body.gender,
        ctx.request.body.birthday,
        ctx.request.body.school,
        ctx.request.body.education,
        ctx.request.body.date_begin,
        ctx.request.body.date_end,
        ctx.request.body.major,
        ctx.request.body.address1,
        ctx.request.body.address2,
        ctx.request.body.address3,
        ctx.request.body.qiwangzhiwei,
        ctx.request.body.qiwanghangye,
        ctx.request.body.yixiangchengshi,
        ctx.request.body.ziwopingjia,
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
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