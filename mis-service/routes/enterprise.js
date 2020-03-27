const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/enterprise'
})

module.exports = router

router
  .get('/certificate/qty', async ctx => {
    const sql = `
      select count(*) as qty from enterprise where status = '未认证'
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql)
      ctx.response.body = { message: '', content: rows[0] }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/certificate/filter/', async ctx => {
    const sql = `
      select *
      from enterprise
      where position(? in name) > 0
        and status = '未认证'
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [ctx.request.body.name])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/certificate/', async ctx => {
    const sql = `
      select * from enterprise where status = '未认证' limit 10
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
  .put('/certificate/', async ctx => {
    const sql = `
      update enterprise
      set status = '认证'
      where id = ?
        and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        parseInt(ctx.request.body.id),
        ctx.request.body.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.info(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/:enterprise_id/recruitment/:recruitment_id', async ctx => {
    const sql = `
      select *
      from recruitment
      where id = ? and uuid = ?
      limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.recruitment_id),
        ctx.request.query.uuid
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
      set name = ?, qty = ?,
        address1 = ?, address2 = ?, address3 = ?,
        date = ?, salary1 = ?, salary2 = ?, education = ?, category = ?,
        description = ?, requirement = ?
      where id = ? and enterprise_id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.name,
        ctx.request.body.qty,
        ctx.request.body.address1,
        ctx.request.body.address2,
        ctx.request.body.address3,
        ctx.request.body.date,
        ctx.request.body.salary1,
        ctx.request.body.salary2,
        ctx.request.body.education,
        ctx.request.body.category,
        ctx.request.body.description,
        ctx.request.body.requirement,
        parseInt(ctx.params.recruitment_id),
        parseInt(ctx.params.enterprise_id),
        ctx.request.query.uuid
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
      insert into recruitment (
        uuid,
        enterprise_id, name, qty,
        address1, address2, address3,
        date, salary1, salary2, education, category,
        description, requirement
      )
      values (uuid(), ?, ?, ?, ?, ?)
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.params.id,
        ctx.request.body.name,
        ctx.request.body.qty,
        ctx.request.body.address1,
        ctx.request.body.address2,
        ctx.request.body.address3,
        ctx.request.body.date,
        ctx.request.body.salary1,
        ctx.request.body.salary2,
        ctx.request.body.education,
        ctx.request.body.category,
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
      where id = ? and enterprise_id = ? and uuid = ?
      limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.user_id),
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
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
      where id = ? and enterprise_id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        ctx.request.body.username,
        ctx.request.body.name,
        parseInt(ctx.params.user_id),
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/:id/user/', async ctx => {
    const sql = `
      select id, uuid, enterprise_id, username, name
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
      insert into enterprise_user (uuid, enterprise_id, username, name)
      values (uuid(), ?, ?, ?)
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
      select * from enterprise where id = ? and uuid = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [parseInt(ctx.params.id), ctx.request.query.uuid])
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
        zhuziguimo = ?, yuangongshuliang = ?,
        address1 = ?, address2 = ?, address3 = ?, address4 = ?
      where id = ? and uuid = ?
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
        ctx.request.body.address1,
        ctx.request.body.address2,
        ctx.request.body.address3,
        ctx.request.body.address4,
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/:id', async ctx => {
    const sql = `
      delete from enterprise where id = ? and uuid = ?
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
  .post('/', async ctx => {
    const sql = `
      insert into enterprise (
        uuid,
        name, yingyezhizhao, faren, zhuceriqi, zhuziguimo, yuangongshuliang,
        address1, address2, address3, address4
      )
      values (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        ctx.request.body.address1,
        ctx.request.body.address2,
        ctx.request.body.address3,
        ctx.request.body.address4
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/', async ctx => {
    const sql = `
      select * from enterprise where position(? in name) > 0 limit 100
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
