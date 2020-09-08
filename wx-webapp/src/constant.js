const RECOMMEND_TYPE = [
  {
    value: '国企',
    name: 'category1',
  },
  {
    value: '公务员',
    name: 'category2',
  },
  {
    value: '事业单位',
    name: 'category3',
  },
  {
    value: '教师',
    name: 'category4',
  },
  {
    value: '其它',
    name: 'category5',
  }];

export const WX_PARAM = {
  appid: 'wx79586a354703320a',
  randomChars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  getTokenApi: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&',
  appSecret: '53b1e116cfb28e1626d1c76ea484b05b',
  jsApiList: [
    'updateAppMessageShareData'
  ]
}

export default RECOMMEND_TYPE;
