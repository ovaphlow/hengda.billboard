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
    },
    {
      id:3,
      title:'四季青服装有限公司'
    },
    {
      id:4,
      title:'深圳市飞易达国际物流有限公司'
    },
    {
      id:5,
      title:'张家港保税区嘉隆化工品有限公司'
    },
    {
      id:6,
      title:'张家港市鑫港货运代理有限公司'
    },
    {
      id:7,
      title:'沧县庆鑫塑料制品厂'
    },
    {
      id:8,
      title:'济南宏泉钛业有限公司'
    },
    {
      id:9,
      title:'东莞市东柯电子科技有限公司'
    }
  ]}
})