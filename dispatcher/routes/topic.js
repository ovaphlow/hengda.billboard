const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/topic'
})

module.exports = router


// 模拟数据
router.get('/', async ctx => {
  ctx.response.body = { message: '', content: [
    {
      id:0,
      title:'中国化工集团曙光橡胶工业研究设计院'
    },
    {
      id:1,
      title:'山东林茂建筑工程有限公司'
    },
    {
      id:2,
      title:'菏泽铭羽企业管理咨询有限公司'
    }
  ]}
})