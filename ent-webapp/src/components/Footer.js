import React from 'react'

const Footer = () => {
  return (
    <div className="row mt-4 shadow-sm  p-2 px-5  bg-white" >
      <div className="col item-middle">
        <div className="pull-left footer-nav p-2 text-center justify-content-center">
          <a className="btn btn-link text-dark" href="#/" >
            关于我们
          </a>|
          <a className="btn btn-link text-dark" href="#/" >
            联系方式
          </a>|
          <a className="btn btn-link text-dark" href="#/" >
            网站地图
          </a>|
          <a className="btn btn-link text-dark" href="#/" >
            常见问题
          </a>|
          <a className="btn btn-link text-dark" href="#/" >
            后台登录
          </a>
        </div>
      </div>
      <div className="col-4 flex-end">
        销售热线: 0461-xxxxxxxx
            &nbsp;&nbsp;&nbsp; 客服电话: 0461-xxxxxxxx<br />
        email:xxxxxxxxg@xxx.com
        </div>
      <div className="col-1 flex-end">
        <img src={require('./img/qr.png')} alt="" style={{ height: 80 }} />
      </div>
    </div>
  )
}

export default Footer