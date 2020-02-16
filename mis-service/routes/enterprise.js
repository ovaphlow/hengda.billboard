const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/enterprise'
})

module.exports = router

router
  .get('/:enterprise_id/recruitment/:recruitment_id', async ctx => {
    const sql = `
      select * from recruitment where id = ? and enterprise_id = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.params.recruitment_id,
        ctx.params.enterprise_id
      ])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/:enterprise_id/recruitment/:recruitment_id', async ctx => {
    const sql = `
      update recruitment
      set name = ?, qty = ?, description = ?, requirement = ?
      where id = ? and enterprise_id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.name,
        ctx.request.body.qty,
        ctx.request.body.description,
        ctx.request.body.requirement,
        ctx.params.recruitment_id,
        ctx.params.enterprise_id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/:id/recruitment/', async ctx => {
    const sql = `
      select * from recruitment where enterprise_id = ? limit 200
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
  .post('/:id/recruitment/', async ctx => {
    const sql = `
      insert into recruitment (enterprise_id, name, qty, description, requirement)
      values (?, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.params.id,
        ctx.request.body.name,
        ctx.request.body.qty,
        ctx.request.body.description,
        ctx.request.body.requirement,
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/:id/user/:user_id', async ctx => {
    const sql = `
      select id, enterprise_id, username, name
      from enterprise_user
      where id = ? and enterprise_id = ?
      limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [ctx.params.user_id, ctx.params.id])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0]: {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/:id/user/:user_id', async ctx => {
    const sql = `
      update enterprise_user
      set username = ?, name = ?
      where id = ? and enterprise_id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.username,
        ctx.request.body.name,
        ctx.params.user_id,
        ctx.params.id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/:id/user/', async ctx => {
    const sql = `
      select id, enterprise_id, username, name
      from enterprise_user
      where enterprise_id = ?
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
  .post('/:id/user/', async ctx => {
    const sql = `
      insert into enterprise_user (enterprise_id, username, name)
      values (?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.params.id,
        ctx.request.body.username,
        ctx.request.body.name
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
      select * from enterprise where id = ? limit 1
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
      update enterprise
      set name = ?, yingyezhizhao = ?, faren = ?, zhuceriqi = ?,
        zhuziguimo = ?, yuangongshuliang = ?
      where id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.name,
        ctx.request.body.yingyezhizhao,
        ctx.request.body.faren,
        ctx.request.body.zhuceriqi,
        ctx.request.body.zhuziguimo,
        ctx.request.body.yuangongshuliang,
        ctx.params.id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/', async ctx => {
    const sql = `
      select *
      from enterprise
      order by id desc
      limit 200
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql)
      ctx.response.body = { message: '', content: rows}
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .post('/', async ctx => {
    const sql = `
      insert into enterprise (name, yingyezhizhao, faren, zhuceriqi, zhuziguimo, yuangongshuliang)
      values (?, ?, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.name,
        ctx.request.body.yingyezhizhao,
        ctx.request.body.faren,
        ctx.request.body.zhuceriqi,
        ctx.request.body.zhuziguimo,
        ctx.request.body.yuangongshuliang
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/', async ctx => {
    const sql = `
      select * from enterprise where position(? in name) > 0 limit 200
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
