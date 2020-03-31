const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/favorite'
})

module.exports = router

router.get('/', async ctx => {
  const sql = `
    select * from favorite where user_id = ? and category1 = '个人用户' order by id desc
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql, [ctx.request.query.master_id])
    ctx.response.body = { message: '', content: rows }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})
