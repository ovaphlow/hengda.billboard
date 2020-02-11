import React from 'react'

const Navbar = props => {
  return (
    <>
      <ul className="nav bg-light nav-light fixed-bottom border-top text-center  justify-content-center" style={{height:'50px', fontSize: 11,flexWrap:'inherit' }}>
        <li className="nav-item">
          <a href="#/" className={`nav-link ${props.category === '首页' ? 'text-primary' : 'text-muted'} `}>
            <i className="fa fa-fw fa-2x fa-home"></i>
            <br></br>
            首页
          </a>
        </li>

        <li className="nav-item">
          <a href="#岗位" className={`nav-link ${props.category === '岗位' ? 'text-primary' : 'text-muted'} `} >
            <i className="fa fa-fw fa-2x fa-id-card-o " aria-hidden="true"></i>
            <br></br>
            岗位
          </a>
        </li>

        <li className="nav-item">
          <a href="#校园招聘" className={`nav-link ${props.category === '校园招聘' ? 'text-primary' : 'text-muted'} `}>
            <img style={{ width: 35, height: 25 }} src="lib/img/icon.png" alt="" />
            <br></br>
            校园招聘
          </a>
        </li>
        <li className="nav-item">
          <a href="#消息" className={`nav-link ${props.category === '消息' ? 'text-primary' : 'text-muted'} `}>
            <i className="fa fa-fw fa-2x fa-envelope" aria-hidden="true"></i>
            <br></br>
            消息
        </a>
        </li>
        <li className="nav-item">
          <a href="#我的" className={`nav-link ${props.category === '我的' ? 'text-primary' : 'text-muted'} `}>
            <i className="fa fa-fw fa-2x fa-user" aria-hidden="true"></i>
            <br></br>
            我的
          </a>
        </li>
      </ul>
    </>
  )
}

export default Navbar