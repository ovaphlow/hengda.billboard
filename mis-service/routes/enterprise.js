const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/enterprise'
})

module.exports = router

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
      await pool.execute(sql, [ctx.request.body.name,
        ctx.request.body.yingyezhizhao,
        ctx.request.body.faren,
        ctx.request.body.zhuceriqi,
        ctx.request.body.zhuziguimo,
        ctx.request.body.yuangongshuliang])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })
