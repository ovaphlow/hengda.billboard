import React from 'react'

const Navbar = props => {
  return (
    <div className="row shadow-sm  px-5 bg-white text-center font-weight-bold">
      <div className={`col ${props.category === '首页' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/">
          首页
        </a>
      </div>
      <div className={`col ${props.category === '岗位' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/岗位/列表">
          岗位管理
        </a>
      </div>
      <div className={`col ${props.category === '简历' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/简历/列表">
          简历管理
        </a>
      </div>
      <div className={`col ${props.category === '消息' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/消息/面试">
          消息
        </a>
      </div>
      <div className={`col ${props.category === '资产' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/">
          我的资产
        </a>
      </div>
      <div className={`col ${props.category === '我的消息' && 'nav-bar-active'}`}>
        <a className="nav-link text-dark" href="#/">
          我的信息
        </a>
      </div>
    </div>
  )
}

export default Navbar