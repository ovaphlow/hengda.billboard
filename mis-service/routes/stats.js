const Router = require('@koa/router')

const mysql = require('../mysql')

const router = new Router({
  prefix: '/api/stats'
})

module.exports = router

router.get('/user/qty', async ctx => {
  const sql = `
    select count(*) as qty from common_user
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql)
    ctx.response.body = { message: '', content: rows[0] }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.get('/enterprise/qty', async ctx => {
  const sql = `
    select count(*) as qty from enterprise
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql)
    ctx.response.body = { message: '', content: rows[0] }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})

router.get('/delivery/qty', async ctx => {
  const sql = `
    select count(*) as qty from delivery
  `
  const pool = mysql.promise()
  try {
    const [rows, _] = await pool.query(sql)
    ctx.response.body = { message: '', content: rows[0] }
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误', content: '' }
  }
})
