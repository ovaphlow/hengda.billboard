import React from 'react'

const Footer = () => {
  return (
    <footer className="shadow-lg shadow mt-auto py-1 bg-white" >
      <div className="container-fluid">
        <div classNam="row">
          <div className="col">
            {/* 深圳市奥思网络科技有限公司版权所有 */}
            <a className="pull-right text-secondary" href="http://www.beian.miit.gov.cn/">
              互联网ICP备案:黑ICP备20002542号
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer