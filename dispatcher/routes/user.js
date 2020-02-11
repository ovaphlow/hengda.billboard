const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/mis-user'
})

module.exports = router

router
  .post('/sign-in', async ctx => {
    console.info(ctx.request.body)
    ctx.response.body = { message: '', content: '' }
  })

router
  .get('/:id', async ctx => {
    ctx.response.body = { message: '', content: '' }
  })
  .put('/:id', async ctx => {
    ctx.response.body = { message: '', content: '' }
  })