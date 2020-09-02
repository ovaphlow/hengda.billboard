const Router = require('@koa/router');
const config = require('../config');
const console = require('../logger');
const fetch = require('node-fetch');
const { wx } = require('../config');

const router = new Router({
  prefix: '/api/wx',
});

module.exports = router;

router
  .get('/token/', async (ctx) => {
    //const wxApi = () => new Promise((resolve, reject) => {
    //  fetch(`${config.wx.getTokenApi}appid=${config.wx.appid}&secret=${config.wx.appSecret}`)
    //  .then(res => res.json())
    //  .then(res => resolve(res))
    //  .catch(err => reject(err))
    //});
    //try {
    //  ctx.response.body = await wxApi()
    //} catch (err) {
    //  console.error(err);
    //  ctx.response.body = { message: '服务器错误' };
    //}
    ctx.response.body = { message: '服务器错误' };
  })
  .get('/ticket/:token', async (ctx) => {
    //console.info(ctx.params.token)
    //const wxApi = (token) => new Promise((resolve, reject) => {
    //  console.info(config.wx.getTokenApi.replace('TOKEN',token))
    //  fetch(`${config.wx.getTicketApi.replace('TOKEN',token)}`)
    //  .then(res => res.json())
    //  .then(res => resolve(res))
    //  .catch(err => reject(err))
    //});
    //try {
    //  ctx.response.body = await wxApi(ctx.params.token)
    //} catch (err) {
    //  console.error(err);
    //  ctx.response.body = { message: '服务器错误' };
    //}
    ctx.response.body = { message: '服务器错误' };
  })