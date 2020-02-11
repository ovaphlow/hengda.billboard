const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/recruitment'
})

module.exports = router

// 模拟数据
router.get('/', async ctx => {

  ctx.response.body = { message: '', content: [
    {
      id:0,
      title:'黑龙江职业学院2019年公开招聘工作人员公告',
      address:'哈尔滨',
      num:'若干',
      org:'黑龙江职业学院',
      type:'教师'
    },
    {
      id:1,
      title:'国家信息中心2019年公开招聘工作人员公告',
      address:'各地',
      num:'若干',
      org:'国家信息中心',
      type:'公务员'
    },
    {
      id:2,
      title:'2019年北京市石景山区事业单位公开招聘工作',
      address:'北京',
      num:'2',
      org:'北京市石景山区人力资源和社会保障局',
      type:'事业单位'
    },
    {
      id:3,
      title:'天津市大数据管理中心公开招聘工作人员公告',
      address:'天津',
      num:'若干',
      org:'天津市人才服务中心',
      type:'国企'
    }
  ]}
})