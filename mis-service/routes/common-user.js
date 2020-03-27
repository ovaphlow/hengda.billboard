const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/common-user'
})

module.exports = router

router
  .get('/:id/resume/:resume_id', async ctx => {
    const sql = `
      select * from resume where id = ? and common_user_id = ? and uuid = ? limit 1
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        parseInt(ctx.params.resume_id),
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: rows.length === 1 ? rows[0] : {} }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .put('/:id/resume/:resume_id', async ctx => {
    const sql = `
      update resume
      set name = ?, phone = ?, email = ?, gender = ?, birthday = ?,
      school = ?, education = ?, date_begin = ?, date_end = ?, major = ?,
      address1 = ?, address2 = ?, address3 = ?,
      qiwangzhiwei = ?, qiwanghangye = ?, yixiangchengshi = ?, ziwopingjia = ?
      where id = ? and common_user_id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
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
        parseInt(ctx.params.resume_id),
        parseInt(ctx.params.id),
        ctx.request.query.uuid
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .delete('/:id/resume/:resume_id', async ctx => {
    const sql = `
      delete from resume where id = ? and uuid = ? and common_user_id = ?
    `
    const pool = mysql.promise()
    try {
      await pool.execute(sql, [
        parseInt(ctx.params.resume_id),
        ctx.request.query.uuid,
        parseInt(ctx.params.id)
      ])
      ctx.response.body = { message: '', content: '' }
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
        uuid,
        common_user_id, name, phone, email, gender, birthday,
        school, education, date_begin, date_end, major,
        address1, address2, address3,
        qiwangzhiwei, qiwanghangye, yixiangchengshi, ziwopingjia
      )
      values (
        uuid(),
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
  .put('/:id/delivery/', async ctx => {
    const sql = `
      select *,
        (select name from resume where id = d.resume_id ) as resume_name,
        (select name from recruitment where id = d.recruitment_id ) as recruitment_name
      from delivery as d
      where datime between ? and ?
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.request.body.filter_date_begin,
        ctx.request.body.filter_date_end
      ])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

// 登录记录、浏览记录、编辑记录
router
  .get('/:id/journal/sign-in/', async ctx => {
    const sql = `
      select * from login_journal where user_id = ? order by id desc limit 100
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
  .put('/:id/journal/sign-in/', async ctx => {
    const sql = `
      select *
      from login_journal
      where user_id = ?
        and datime between ? and ?
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.params.id,
        ctx.request.body.date_begin,
        ctx.request.body.date_end
      ])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/:id/journal/browse/', async ctx => {
    const sql = `
      select * from browse_journal where common_user_id = ? order by id desc limit 100
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
  .put('/:id/journal/browse/', async ctx => {
    const sql = `
      select *
      from browse_journal
      where common_user_id = ?
        and datime between ? and ?
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.params.id,
        ctx.request.body.date_begin,
        ctx.request.body.date_end
      ])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
  .get('/:id/journal/edit/', async ctx => {
    const sql = `
      select * from edit_journal where user_id = ? order by id desc limit 100
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
  .put('/:id/journal/edit/', async ctx => {
    const sql = `
      select *
      from edit_journal
      where user_id = ?
        and datime between ? and ?
    `
    const pool = mysql.promise()
    try {
      const [rows, fields] = await pool.query(sql, [
        ctx.params.id,
        ctx.request.body.date_begin,
        ctx.request.body.date_end
      ])
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })

router
  .get('/:id', async ctx => {
    const sql = `
      select id, uuid, username, name, email, phone
      from common_user
      where id = ? and uuid = ?
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
  .put('/:id', async ctx => {
    const sql = `
      update common_user
      set username = ?, name = ?, email = ?, phone = ?
      where id = ? and uuid = ?
    `
    const pool = mysql.promise()
    try {
      await pool.query(sql, [
        ctx.request.body.username,
        ctx.request.body.name,
        ctx.request.body.email,
        ctx.request.body.phone,
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
    // 需要处理用户的简历？
    const sql = `
      delete from common_user where id = ? and uuid = ?
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
  .put('/', async ctx => {
    const sql = `
      select id, uuid, name, username, phone, email,
        (select count(*) from favorite where user_id = cu.id) as qty_favorite
        -- 投递数量
        -- (select count(*) from favorite where common_user_id = cu.id) as qty_delivery
      from common_user as cu
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
      insert into common_user (uuid, username, password, name, email, phone)
      values (uuid(), ?, ?, ?, ?, ?)
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
