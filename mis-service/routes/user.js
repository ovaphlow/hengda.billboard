const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/user'
})

module.exports = router

router
  .post('/sign-in', async ctx => {
    console.info(ctx.request.body)
    ctx.response.body = { message: '', content: '' }
  })

router
  .get('/', async ctx => {
    const sql = `
      select id, username, name
      from mis_user
      limit 200
    `
    const pp = mysql.promise()
    try {
      const [rows, fields] = await pp.query(sql)
      ctx.response.body = { message: '', content: rows }
    } catch (err) {
      console.error(err)
      ctx.response.body = { message: '服务器错误', content: '' }
    }
  })